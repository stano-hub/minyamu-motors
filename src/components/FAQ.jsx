import React, { useState, useEffect } from 'react';
import './stylres/FAQ.css';
import Sidebar from './Sidebar';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const faqList = [ {
    question: "What types of cars do you sell?",
    answer: "We offer a wide range of vehicles, including new and pre-owned cars, SUVs, trucks, and electric vehicles."
  },
  {
    question: "How do I buy a car from Minyamu Motors?",
    answer: "Simply browse our online inventory, select a car that meets your needs, and proceed to checkout or contact us."
  },
  {
    question: "Do you offer financing options for car purchases?",
    answer: "Yes! We provide flexible financing through partnered banks and lenders. Apply directly on our site."
  },
  {
    question: "Can I trade in my old car?",
    answer: "Absolutely! Get an appraisal by filling out the trade-in form or visiting our dealership."
  },
 
  {
    question: "Can I schedule a test drive?",
    answer: "Yes, you can book test drives online or by phone."
  },
  {
    question: "What is the process for buying a used car?",
    answer: "Select a used car, apply for financing or pay in full, and complete the purchase with our help."
  },
  {
    question: "Are cars on your site available immediately?",
    answer: "Yes, cars listed are ready for purchase unless marked otherwise. Contact us for current availability."
  },
  {
    question: "How do I know if a car is right for me?",
    answer: "We provide descriptions, photos, and specs. Need help? Contact us for personalized guidance."
  },
  {
    question: "Can I buy a car online and get it delivered?",
    answer: "Yes! We offer delivery depending on your location. Details are provided at checkout."
  },
  {
    question: "What if I have an issue after purchase?",
    answer: "Contact our support team. We’ll assist with repairs or warranty claims."
  },
  {
    question: "How do I check a used car’s history?",
    answer: "Each used car includes a history report for full transparency."
  },
  {
    question: "Can I negotiate the price?",
    answer: "Prices are competitive, but we occasionally offer promotions. Ask us about current deals."
  },
  {
    question: "What should I bring when buying?",
    answer: "Bring ID, proof of insurance, income (if financing), and your trade-in vehicle if applicable."
  },
  {
    question: "Do you have promotions or discounts?",
    answer: "Yes! We offer seasonal sales and loyalty discounts. Sign up for our newsletter to stay updated."
  },

  {
    question: "Can I reserve a car?",
    answer: "Yes, you can place a refundable deposit to reserve a car for up to 48 hours."
  },
  {
    question: "Is insurance required to buy a car?",
    answer: "Yes, valid insurance is required before you drive off the lot. We can assist if needed."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept bank transfers, credit/debit cards, and financing options through our partners."
  },
  {
    question: "Do you offer after-sales services?",
    answer: "Yes, we provide maintenance, repairs, and service packages after your purchase."
  }];

  const handleToggle = (index) => {
    setActiveIndex(prev => prev === index ? null : index);
    document.getElementById(`faq-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScroll = () => {
    setShowButton(window.scrollY > 400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="faq-container">
      <Sidebar />
      <div className="faq-content">
        <img src="/images/logo.png" alt="Minyamu Motors Logo" className="faq-logo" />
        <h2 className="faq-title">Frequently Asked Questions (FAQ)</h2>
        <div className="faq-list">
          {faqList.map((faq, index) => (
            <div key={index} className="faq-item" id={`faq-${index}`}>
              <div className="faq-question" onClick={() => handleToggle(index)}>
                <h3>{faq.question}</h3>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {showButton && (
          <button className="back-to-top" onClick={scrollToTop}>
            ↑ Back to Top
          </button>
        )}
      </div>
    </div>
  );
};

export default FAQ;
