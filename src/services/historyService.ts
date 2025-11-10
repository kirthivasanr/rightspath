import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  deleteDoc, 
  doc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface QuestionHistory {
  id?: string;
  userId: string;
  question: string;
  answer?: string;
  timestamp: Timestamp;
  language: string;
}

export class HistoryService {
  private static readonly COLLECTION_NAME = 'questionHistory';

  // Save a question to history
  static async saveQuestion(
    userId: string, 
    question: string, 
    language: string,
    answer?: string
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), {
        userId,
        question,
        answer: answer || '',
        timestamp: Timestamp.now(),
        language
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving question to history:', error);
      throw error;
    }
  }

  // Get user's question history
  static async getUserHistory(userId: string): Promise<QuestionHistory[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const history: QuestionHistory[] = [];
      
      querySnapshot.forEach((doc) => {
        history.push({
          id: doc.id,
          ...doc.data()
        } as QuestionHistory);
      });
      
      return history;
    } catch (error) {
      console.error('Error fetching user history:', error);
      throw error;
    }
  }

  // Delete a question from history
  static async deleteQuestion(questionId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.COLLECTION_NAME, questionId));
    } catch (error) {
      console.error('Error deleting question from history:', error);
      throw error;
    }
  }

  // Update question with answer
  static async updateQuestionWithAnswer(
    questionId: string, 
    answer: string
  ): Promise<void> {
    try {
      const questionRef = doc(db, this.COLLECTION_NAME, questionId);
      await addDoc(collection(db, this.COLLECTION_NAME), {
        answer
      });
    } catch (error) {
      console.error('Error updating question with answer:', error);
      throw error;
    }
  }
}
