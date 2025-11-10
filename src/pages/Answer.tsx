
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';
import { RagApiService } from '../services/ragApiService';

const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const question = location.state?.question || 'How to apply for Pradhan Mantri Awas Yojana?';
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    fetchAnswer();
  }, [question]);

  const fetchAnswer = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await RagApiService.askQuestion({
        question: question,
        language: currentLanguage
      });
      
      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch answer. Please make sure the backend server is running.');
      console.error('Error fetching answer:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Your Question</h1>
              <p className="text-gray-600 mt-1">{question}</p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-sm p-12 mb-8 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
              <p className="text-lg text-gray-600">Generating answer using AI...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-2xl shadow-sm p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
                  <p className="text-red-700">{error}</p>
                  <p className="text-sm text-red-600 mt-2">
                    Make sure the backend server is running on port 5000
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Answer Display */}
          {!loading && !error && answer && (
            <>
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Answer</h2>
                <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {answer}
                </div>
              </div>

              {/* Sources */}
              {sources.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Sources Used</h3>
                  <div className="space-y-3">
                    {sources.map((source, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <ExternalLink className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">{source.title}</p>
                          {source.source && (
                            <a 
                              href={source.source} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-teal-600 hover:underline"
                            >
                              {source.source}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Ask Another Question
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl text-lg font-semibold hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              Save This Answer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Answer;
