
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Scale, MessageCircle, Users } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: MessageCircle,
      title: t('landing.features.voiceText.title'),
      description: t('landing.features.voiceText.description')
    },
    {
      icon: Scale,
      title: t('landing.features.legalRights.title'),
      description: t('landing.features.legalRights.description')
    },
    {
      icon: Users,
      title: t('landing.features.govSchemes.title'),
      description: t('landing.features.govSchemes.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-white">
      {/* Header */}
      <header className="px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RP</span>
            </div>
            <span className="text-xl font-bold text-gray-800">{t('navbar.appName')}</span>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            {t('landing.title')}
          </h1>
          <p className="text-xl md:text-2xl text-teal-600 font-semibold mb-8">
            {t('landing.subtitle')}
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('landing.description')}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {t('landing.getStarted')}
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
