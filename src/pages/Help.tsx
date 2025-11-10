import React from 'react';
import { Mail, Phone, MessageCircle, Shield, Users, Zap, HelpCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';

const Help = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: MessageCircle,
      title: t('help.features.voiceText.title'),
      description: t('help.features.voiceText.description')
    },
    {
      icon: Shield,
      title: t('help.features.legalRights.title'),
      description: t('help.features.legalRights.description')
    },
    {
      icon: Users,
      title: t('help.features.govSchemes.title'),
      description: t('help.features.govSchemes.description')
    },
    {
      icon: Zap,
      title: t('help.features.instantAnswers.title'),
      description: t('help.features.instantAnswers.description')
    }
  ];

  const steps = [
    {
      step: 1,
      title: t('help.howToUse.step1.title'),
      description: t('help.howToUse.step1.description')
    },
    {
      step: 2,
      title: t('help.howToUse.step2.title'),
      description: t('help.howToUse.step2.description')
    },
    {
      step: 3,
      title: t('help.howToUse.step3.title'),
      description: t('help.howToUse.step3.description')
    },
    {
      step: 4,
      title: t('help.howToUse.step4.title'),
      description: t('help.howToUse.step4.description')
    }
  ];

  const faqs = [
    {
      question: t('help.faq.question1'),
      answer: t('help.faq.answer1')
    },
    {
      question: t('help.faq.question2'),
      answer: t('help.faq.answer2')
    },
    {
      question: t('help.faq.question3'),
      answer: t('help.faq.answer3')
    },
    {
      question: t('help.faq.question4'),
      answer: t('help.faq.answer4')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t('help.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('help.subtitle')}
            </p>
          </div>

          {/* What We Do Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              {t('help.whatWeDo.title')}
            </h2>
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                {t('help.whatWeDo.description')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center mb-4">
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
          </section>

          {/* How to Use Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              {t('help.howToUse.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              {t('help.faq.title')}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed ml-8">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Languages Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                {t('help.languages.title')}
              </h2>
              <p className="text-gray-700 text-center mb-6">
                {t('help.languages.description')}
              </p>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-sm">
                    <span className="text-2xl font-bold text-teal-600">En</span>
                  </div>
                  <span className="text-gray-700 font-medium">English</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-sm">
                    <span className="text-2xl font-bold text-teal-600">हि</span>
                  </div>
                  <span className="text-gray-700 font-medium">हिंदी</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-sm">
                    <span className="text-2xl font-bold text-teal-600">த</span>
                  </div>
                  <span className="text-gray-700 font-medium">தமிழ்</span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Support Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                {t('help.support.title')}
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                {t('help.support.description')}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Email Support */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('help.support.email.title')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('help.support.email.description')}
                  </p>
                  <a 
                    href="mailto:support@rightspath.com"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Mail className="w-5 h-5" />
                    support@rightspath.com
                  </a>
                </div>

                {/* Phone Support */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('help.support.phone.title')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('help.support.phone.description')}
                  </p>
                  <a 
                    href="tel:+911800123456"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Phone className="w-5 h-5" />
                    +91 1800 123 456
                  </a>
                </div>
              </div>

              <div className="mt-8 p-6 bg-teal-50 rounded-xl">
                <h4 className="text-lg font-semibold text-teal-800 mb-2">
                  {t('help.support.hours.title')}
                </h4>
                <p className="text-teal-700">
                  {t('help.support.hours.description')}
                </p>
              </div>
            </div>
          </section>

          {/* Get Started CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                {t('help.getStarted.title')}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t('help.getStarted.description')}
              </p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="inline-flex items-center gap-3 bg-white text-teal-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {t('help.getStarted.button')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Help;
