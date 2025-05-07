import React, { useState } from 'react';
import './stylres/FAQ.css'; // Import the custom CSS for FAQ styling
import Sidebar from './Sidebar';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Array of FAQs
  const faqList = [
    {
      question: "What types of cars do you sell?",
      answer: "We offer a wide range of vehicles, including new and pre-owned cars, SUVs, trucks, and electric vehicles. We strive to provide options for various budgets and preferences."
    },
    {
      question: "How do I buy a car from Minyamu Motors?",
      answer: "Simply browse our online inventory, select a car that meets your needs, and either contact us directly or proceed to checkout to complete your purchase."
    },
    {
      question: "Do you offer financing options for car purchases?",
      answer: "Yes! We offer flexible financing options through partnered banks and lenders. You can apply for financing directly on our website."
    },
    {
      question: "Can I trade in my old car?",
      answer: "Absolutely! We accept trade-ins. You can get an appraisal for your car by filling out the trade-in form on our website or bringing it to our dealership."
    },
    {
      question: "Do you offer warranties on your cars?",
      answer: "Yes, all of our cars come with a warranty. The specific coverage depends on the make, model, and whether the car is new or used."
    },
    {
      question: "Can I schedule a test drive?",
      answer: "Yes, you can schedule a test drive online or by calling us directly. We'll arrange a time for you to come in and experience the vehicle firsthand."
    },
    {
      question: "What is the process for buying a used car?",
      answer: "The process is simple! Browse our used car selection, choose a vehicle, apply for financing or pay in full, and finalize the deal with our team. We ensure all our used cars are inspected and come with a limited warranty."
    },
    {
      question: "Are the cars on your website available for immediate purchase?",
      answer: "Yes, all cars listed on our website are available for purchase, and you can get started right away. However, availability may change, so it’s always a good idea to inquire for the latest details."
    },
    {
      question: "How do I know if the car is right for me?",
      answer: "We provide detailed descriptions, photos, and specifications for each car on our website. If you need more information, feel free to reach out, and we’ll assist you in making the best choice."
    },
    {
      question: "Can I buy a car online and have it delivered?",
      answer: "Yes, we offer delivery options for cars purchased online. Depending on your location, we’ll arrange for the vehicle to be delivered to your home or the nearest dealership."
    },
    {
      question: "What should I do if I have an issue with my car after purchase?",
      answer: "We have a dedicated customer support team that will help resolve any post-purchase issues. Please contact us directly, and we’ll assist you with the necessary steps for repair or replacement."
    },
    {
      question: "How do I check the history of a used car?",
      answer: "All of our used cars come with a detailed vehicle history report. You can request this information during your vehicle search, and we’ll provide you with full transparency."
    },
    {
      question: "Can I negotiate the price of a car?",
      answer: "While our prices are competitive and based on the market, we occasionally offer promotions or discounts. Feel free to inquire with our team to see if there are any available discounts or special offers."
    },
    {
      question: "What should I bring with me when buying a car?",
      answer: "You'll need a valid driver’s license, proof of insurance, proof of income (if financing), and a trade-in vehicle (if applicable). For more details, please contact us before your visit."
    },
    {
      question: "Do you have any promotions or discounts?",
      answer: "Yes, we often run seasonal promotions, special discounts for first-time buyers, or loyalty programs. Keep an eye on our website or subscribe to our newsletter for the latest offers."
    },
  ];

  // Toggle FAQ answer visibility
  const handleToggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // If the same FAQ is clicked, close it
    } else {
      setActiveIndex(index); // Otherwise, open the clicked FAQ
    }
  };

  return (
    <div className="faq-container">
        <Sidebar/>
        <img src="/images/logo.png" alt="Minyamu Motors Logo" className="faq-logo" />

      <h2 className="faq-title">Frequently Asked Questions (FAQ)</h2>
      <div className="faq-list">
        {faqList.map((faq, index) => (
          <div key={index} className="faq-item">
            <div 
              className="faq-question" 
              onClick={() => handleToggle(index)}
            >
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
    </div>
  );
};

export default FAQ;
