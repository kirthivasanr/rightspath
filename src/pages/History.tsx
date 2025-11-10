import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MessageSquare, Trash2, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { HistoryService, QuestionHistory } from '../services/historyService';

const History = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const [history, setHistory] = useState<QuestionHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    loadHistory();
  }, [currentUser, navigate]);

  const loadHistory = async () => {
    if (!currentUser) return;
    
    try {
      const userHistory = await HistoryService.getUserHistory(currentUser.uid);
      setHistory(userHistory);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!questionId) return;
    
    try {
      await HistoryService.deleteQuestion(questionId);
      setHistory(history.filter(item => item.id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleQuestionClick = (question: string) => {
    navigate('/answer', { state: { question } });
  };

  const filteredHistory = history.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.answer && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {t('history.title')}
              </h1>
              <p className="text-gray-600">
                {t('history.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-5 h-5" />
              <span className="text-sm">
                {history.length} {t('history.questionsCount')}
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('history.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {searchTerm ? t('history.noSearchResults') : t('history.noHistory')}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? t('history.tryDifferentSearch') : t('history.startAsking')}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <MessageSquare className="w-5 h-5" />
                    {t('history.askQuestion')}
                  </button>
                )}
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <button
                        onClick={() => handleQuestionClick(item.question)}
                        className="text-left w-full group"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <MessageSquare className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium group-hover:text-teal-700 transition-colors">
                              {item.question}
                            </p>
                          </div>
                        </div>
                      </button>
                      
                      {item.answer && (
                        <div className="ml-8 mb-3">
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {item.answer}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 ml-8 text-sm text-gray-500">
                        <span>{formatDate(item.timestamp)}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {item.language.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteQuestion(item.id!)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title={t('history.deleteQuestion')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;
