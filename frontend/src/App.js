import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const callPhone = () => {
    // Проверяем, поддерживает ли устройство телефонные ссылки
    const phoneNumber = '+375295626555';
    console.log('Attempting to call:', phoneNumber);
    
    // Для мобильных устройств
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // Для десктопа - показываем номер или копируем в буфер
      if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
          alert(`Номер телефона скопирован: ${phoneNumber}`);
        }).catch(() => {
          alert(`Позвоните по номеру: ${phoneNumber}`);
        });
      } else {
        alert(`Позвоните по номеру: ${phoneNumber}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      
      {/* Floating Call Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            console.log('Floating button clicked');
            callPhone();
          }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transform transition-all duration-300 hover:shadow-blue-500/25 pulse-animation"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
        </button>
      </div>

      {/* Header */}
      <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.707 6.293a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dental Studio</h1>
                <p className="text-sm text-gray-600">Стоматологический кабинет</p>
              </div>
            </div>

            {/* Desktop Navigation - в строчку */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative"
              >
                Услуги
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative"
              >
                О нас
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('schedule')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative"
              >
                Время работы
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative"
              >
                Контакты
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 hover:w-full"></span>
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+375295626555" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                +375 29 562-65-55
              </a>
              <button
                onClick={() => {
                  console.log('Header button clicked');
                  callPhone();
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Записаться
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-4 mb-4">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">Услуги</button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">О нас</button>
                <button onClick={() => scrollToSection('schedule')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">Время работы</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">Контакты</button>
                <div className="border-t pt-4">
                  <a href="tel:+375295626555" className="text-blue-600 font-semibold block mb-2">
                    +375 29 562-65-55
                  </a>
                  <button
                    onClick={callPhone}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:scale-105 transform transition-all duration-300"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3845683/pexels-photo-3845683.jpeg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-600/40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Здоровая улыбка - 
              <span className="text-gradient bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent"> наше призвание</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Современная стоматология с итальянским оборудованием в самом центре Мозыря
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  console.log('Hero button clicked');
                  callPhone();
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 w-full sm:w-auto"
              >
                Записаться на прием
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 w-full sm:w-auto"
              >
                Наши услуги
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наши <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">услуги</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр стоматологических услуг с использованием современного итальянского оборудования
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl hover:scale-105 transform transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl mb-6 w-fit">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Терапевтическая стоматология</h3>
              <p className="text-gray-600 mb-6">Лечение кариеса, пульпита, периодонтита. Восстановление зубов современными материалами.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Лечение кариеса
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Пломбирование
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Эндодонтическое лечение
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:scale-105 transform transition-all duration-300">
              <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-xl mb-6 w-fit">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Консервативная пародонтология</h3>
              <p className="text-gray-600 mb-6">Профилактика и лечение заболеваний десен. Профессиональная гигиена полости рта.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Лечение гингивита
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Профессиональная чистка
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Профилактика
                </li>
              </ul>
              
              <div className="mt-6">
                <button
                  onClick={() => scrollToSection('pricing-parodont')}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-semibold"
                >
                  Узнать стоимость
                </button>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:scale-105 transform transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-xl mb-6 w-fit">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.894.553l2.991 5.982a.869.869 0 010 .778l-1.974 3.947a1 1 0 01-1.789 0L10.149 9.313a.87.87 0 010-.778l2.991-5.982A1 1 0 0112 2z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ортопедическая стоматология</h3>
              <p className="text-gray-600 mb-6">Протезирование зубов, коронки, мостовидные протезы. Восстановление жевательной функции.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Коронки и мосты
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Протезирование
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Реставрация
                </li>
              </ul>
              
              <div className="mt-6">
                <button
                  onClick={() => scrollToSection('pricing-orthopedic')}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-semibold"
                >
                  Узнать стоимость
                </button>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => scrollToSection('pricing-therapy')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-semibold"
                >
                  Узнать стоимость
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Стоимость <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">услуг</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Прозрачные цены на качественное стоматологическое лечение
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Терапевтическая стоматология */}
            <div id="pricing-therapy" className="glass-card p-8 rounded-2xl hover:scale-105 transform transition-all duration-300 relative">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl mb-4 w-fit mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Терапевтическая стоматология</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Лечение кариеса</span>
                  <span className="font-semibold text-blue-600">от 80 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Пломбирование</span>
                  <span className="font-semibold text-blue-600">от 60 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Эндодонтическое лечение</span>
                  <span className="font-semibold text-blue-600">от 120 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Лечение пульпита</span>
                  <span className="font-semibold text-blue-600">от 150 руб.</span>
                </div>
              </div>

              <button
                onClick={callPhone}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-semibold"
              >
                Записаться на прием
              </button>
            </div>

            {/* Консервативная пародонтология */}
            <div id="pricing-parodont" className="glass-card p-8 rounded-2xl hover:scale-105 transform transition-all duration-300 relative border-2 border-green-200">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Популярно
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-xl mb-4 w-fit mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Консервативная пародонтология</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Лечение гингивита</span>
                  <span className="font-semibold text-green-600">от 90 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Профессиональная чистка</span>
                  <span className="font-semibold text-green-600">от 70 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Удаление зубного камня</span>
                  <span className="font-semibold text-green-600">от 50 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Профилактика</span>
                  <span className="font-semibold text-green-600">от 40 руб.</span>
                </div>
              </div>

              <button
                onClick={callPhone}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-semibold"
              >
                Записаться на прием
              </button>
            </div>

            {/* Ортопедическая стоматология */}
            <div id="pricing-orthopedic" className="glass-card p-8 rounded-2xl hover:scale-105 transform transition-all duration-300 relative">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-xl mb-4 w-fit mx-auto">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.894.553l2.991 5.982a.869.869 0 010 .778l-1.974 3.947a1 1 0 01-1.789 0L10.149 9.313a.87.87 0 010-.778l2.991-5.982A1 1 0 0112 2z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ортопедическая стоматология</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Коронки керамические</span>
                  <span className="font-semibold text-purple-600">от 300 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Мостовидные протезы</span>
                  <span className="font-semibold text-purple-600">от 800 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Съемные протезы</span>
                  <span className="font-semibold text-purple-600">от 400 руб.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Реставрация зубов</span>
                  <span className="font-semibold text-purple-600">от 200 руб.</span>
                </div>
              </div>

              <button
                onClick={callPhone}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-semibold"
              >
                Записаться на прием
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Важная информация</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Консультация бесплатная</h4>
                    <p className="text-gray-600 text-sm">При выполнении любого лечения консультация и осмотр не оплачиваются</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Гарантия качества</h4>
                    <p className="text-gray-600 text-sm">Предоставляем гарантию на все виды лечения и протезирования</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-500 text-sm">* Указанные цены являются базовыми. Окончательная стоимость определяется после консультации и осмотра.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Итальянское</span> оборудование
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Мы используем только самое современное итальянское стоматологическое оборудование, 
                которое обеспечивает высочайшее качество лечения и комфорт пациентов.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Современные технологии</h3>
                    <p className="text-gray-600">Использование передовых методов диагностики и лечения</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Безболезненное лечение</h3>
                    <p className="text-gray-600">Современная анестезия и щадящие методы лечения</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Стерильность и безопасность</h3>
                    <p className="text-gray-600">Соблюдение всех стандартов стерилизации и дезинфекции</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8 rounded-2xl">
                <img 
                  src="https://images.pexels.com/photos/914912/pexels-photo-914912.jpeg" 
                  alt="Современное стоматологическое оборудование" 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Профессиональное оборудование</h3>
                  <p className="text-gray-600">
                    Наша клиника оснащена самым современным итальянским стоматологическим оборудованием, 
                    что позволяет проводить лечение на высшем уровне.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Время <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">работы</span>
            </h2>
            <p className="text-xl text-gray-600">
              Мы работаем для вашего удобства в удобное время
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">График работы</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-semibold text-gray-900">Понедельник - Пятница</span>
                      <span className="text-blue-600 font-bold">8:00 - 21:00</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="font-semibold text-gray-900">Суббота</span>
                      <span className="text-green-600 font-bold">9:00 - 15:00</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-900">Воскресенье</span>
                      <span className="text-gray-600 font-bold">Выходной</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Запись на прием</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600">Телефон для записи</p>
                        <a href="tel:+375295626555" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                          +375 29 562-65-55
                        </a>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Рекомендуем записываться заранее</h4>
                      <p className="text-gray-600 text-sm">
                        Для вашего удобства мы рекомендуем записываться на прием заранее. 
                        Это поможет избежать ожидания и выбрать наиболее удобное время.
                      </p>
                    </div>

                    <button
                      onClick={callPhone}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-lg font-semibold"
                    >
                      Записаться сейчас
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Отзывы наших <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">пациентов</span>
            </h2>
            <p className="text-xl text-gray-600">
              Мы гордимся доверием наших пациентов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  А
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Анна Петрова</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Отличная клиника! Современное оборудование, профессиональные врачи. 
                Лечение прошло быстро и безболезненно. Рекомендую!"
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  М
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Михаил Иванов</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Очень доволен качеством обслуживания. Удобное расположение, 
                приятная атмосфера. Обязательно буду обращаться еще!"
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  Е
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Елена Козлова</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Замечательная клиника с высоким уровнем сервиса. 
                Современное итальянское оборудование действительно делает разницу!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Наши <span className="text-gradient bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">контакты</span>
            </h2>
            <p className="text-xl text-blue-100">
              Мы находимся в самом центре Мозыря
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="glass-card-dark p-6 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Адрес</h3>
                    <p className="text-blue-100">г. Мозырь, ул. Ленинская, 9-18</p>
                  </div>
                </div>
              </div>

              <div className="glass-card-dark p-6 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Телефон</h3>
                    <a href="tel:+375295626555" className="text-blue-200 hover:text-white text-lg">
                      +375 29 562-65-55
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card-dark p-6 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Время работы</h3>
                    <div className="text-blue-100 space-y-1">
                      <p>Пн-Пт: 8:00 - 21:00</p>
                      <p>Сб: 9:00 - 15:00</p>
                      <p>Вс: Выходной</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={callPhone}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
              >
                Позвонить сейчас
              </button>
            </div>

            <div className="glass-card-dark p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Как нас найти</h3>
              <div className="w-full h-64 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A8b7b6c0b7b6c0b7b6c0b7b6c0b7b6c0b&amp;source=constructor"
                  width="100%"
                  height="100%"
                  style={{border: 0, borderRadius: '0.5rem'}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Стоматологический кабинет на карте"
                ></iframe>
              </div>
              <p className="text-blue-100 text-sm">
                Мы находимся в центре города, рядом с остановкой общественного транспорта. 
                Есть возможность парковки рядом с клиникой.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.707 6.293a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Dental Studio</h3>
                  <p className="text-gray-400 text-sm">Стоматологический кабинет</p>
                </div>
              </div>
              <p className="text-gray-400">
                Современная стоматология с итальянским оборудованием в центре Мозыря.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Терапевтическая стоматология</li>
                <li>Консервативная пародонтология</li>
                <li>Ортопедическая стоматология</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p>г. Мозырь, ул. Ленинская, 9-18</p>
                <a href="tel:+375295626555" className="text-blue-400 hover:text-blue-300">
                  +375 29 562-65-55
                </a>
                <p>Пн-Пт: 8:00-21:00, Сб: 9:00-15:00</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Dental Studio. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;