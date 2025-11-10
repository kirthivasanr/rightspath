import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { HistoryService } from '../services/historyService';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t, currentLanguage, translations } = useLanguage();
  const { currentUser } = useAuth();
  const [question, setQuestion] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error("Web Speech API is not supported by this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    // Set language based on current language selection
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ta' ? 'ta-IN' : 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      setQuestion(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [currentLanguage]); // Add currentLanguage as dependency

  const recentQuestions = translations.dashboard.recentQuestions;

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        setQuestion('');
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      // Save question to history if user is logged in
      if (currentUser) {
        try {
          await HistoryService.saveQuestion(
            currentUser.uid, 
            question.trim(), 
            currentLanguage
          );
        } catch (error) {
          console.error('Error saving question to history:', error);
        }
      }
      
      navigate('/answer', { state: { question } });
    }
  };

  const handleRecentQuestion = async (recentQuestion: string) => {
    // Save question to history if user is logged in
    if (currentUser) {
      try {
        await HistoryService.saveQuestion(
          currentUser.uid, 
          recentQuestion, 
          currentLanguage
        );
      } catch (error) {
        console.error('Error saving question to history:', error);
      }
    }
    
    navigate('/answer', { state: { question: recentQuestion } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('dashboard.welcomeTitle')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('dashboard.welcomeSubtitle')}
            </p>

            {/* Voice Input Button */}
            <button
              onClick={handleVoiceInput}
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-gradient-to-r from-teal-500 to-blue-600 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              <Mic className="w-8 h-8 text-white" />
            </button>

            {isListening && (
              <p className="text-red-600 font-medium mb-4 animate-pulse">
                {t('dashboard.listeningText')}
              </p>
            )}
          </div>

          {/* Text Input */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={t('dashboard.inputPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`p-3 rounded-xl transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={!question.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Recent Questions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.recentQuestionsTitle')}</h2>
            </div>
            
            <div className="space-y-3">
              {recentQuestions.map((recentQuestion, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentQuestion(recentQuestion)}
                  className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-teal-50 hover:border-teal-200 border border-transparent transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 group-hover:text-teal-700">
                      {recentQuestion}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
