// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface AskQuestionRequest {
  question: string;
  language: string;
}

export interface AskQuestionResponse {
  question: string;
  answer: string;
  language: string;
  sources: Array<{
    id: string;
    title: string;
    source: string;
  }>;
  context_used: number;
}

export class RagApiService {
  /**
   * Check if the RAG API is healthy and running
   */
  static async healthCheck(): Promise<{ status: string; message: string; documents_count: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  /**
   * Ask a question and get an AI-generated answer
   */
  static async askQuestion(request: AskQuestionRequest): Promise<AskQuestionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get answer');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Ask question error:', error);
      throw new Error(error.message || 'Failed to connect to the AI service. Please make sure the backend server is running.');
    }
  }
}
