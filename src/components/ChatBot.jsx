import React, { useState, useEffect, useRef } from 'react';
import './stylres/ChatBot.css';

const faqResponses = [
  { 
    keywords: ["hello", "hi", "hey", "greetings", "morning", "evening"], 
    response: "Hi there! Welcome to Minyamu Motors. How can I assist you today?" 
  },
  { 
    keywords: ["how are you", "how's it going"], 
    response: "I'm doing well, thank you! How can I help you?" 
  },
  { 
    keywords: ["bye", "goodbye", "see you"], 
    response: "Goodbye! Feel free to return anytime." 
  },
  { 
    keywords: ["thanks", "thank you", "appreciate"], 
    response: "You're welcome! Let me know if there's anything else." 
  },
  { 
    keywords: ["open", "hours", "time"], 
    response: "We are open Monday to Saturday, 9am to 6pm." 
  },
  { 
    keywords: ["location", "address", "where"], 
    response: "We're at 123 Main Street, Nairobi. [Google Maps](https://maps.app.goo.gl/G1V4Eyt93xPDZDDc8)" 
  },
  { 
    keywords: ["contact", "phone", "email"], 
    response: "You can reach us at 0700-123-456 or info@minyamumotors.com." 
  },
  { 
    keywords: ["installment", "financing", "loan"], 
    response: "Yes, we offer car financing through our trusted partners." 
  },
  { 
    keywords: ["delivery", "ship", "transport"], 
    response: "We deliver cars within major cities in Kenya." 
  },
  { 
    keywords: ["about", "company", "who are you"], 
    response: "Visit our [About Us](https://www.minyamumotors.com/about) page to learn more." 
  },
  { 
    keywords: ["support", "help", "assist"], 
    response: "I'm Lily, your assistant. How can I support you today?" 
  },
  { 
    keywords: ["inventory", "cars for sale", "models"], 
    response: "You can view our cars on the homepage or the 'Cars' section." 
  },
  { 
    keywords: ["price", "cost", "how much"], 
    response: "Our cars range in price. Let me know what model you're interested in." 
  },
  { 
    keywords: ["new cars", "latest", "2024 models"], 
    response: "Yes, we have the latest 2024 models available." 
  },
  { 
    keywords: ["used cars", "second hand", "pre-owned"], 
    response: "We sell both new and pre-owned cars, all well inspected." 
  },
  { 
    keywords: ["book", "test drive", "drive"], 
    response: "You can book a test drive by contacting us at info@minyamumotors.com." 
  },
  { 
    keywords: ["warranty", "guarantee", "coverage"], 
    response: "We do not provide warranties at this time." 
  },
  { 
    keywords: ["insurance"], 
    response: "We can connect you with our insurance partners if you need coverage." 
  },
  { 
    keywords: ["mechanic", "service", "repair"], 
    response: "We can recommend trusted service providers near you." 
  },
  { 
    keywords: ["color", "colors", "paint"], 
    response: "Our cars come in a variety of colors. What are you interested in?" 
  },
  { 
    keywords: ["down payment", "deposit"], 
    response: "A minimum 20% down payment is required for financing." 
  },
  { 
    keywords: ["pickup", "collection"], 
    response: "Cars can be picked up from our Nairobi yard or delivered to your location." 
  },
  { 
    keywords: ["availability", "stock"], 
    response: "Please specify the model, and I’ll confirm if it’s in stock." 
  },
  { 
    keywords: ["ID", "documents", "papers"], 
    response: "You'll need a national ID, KRA PIN, and proof of income for financing." 
  },
  { 
    keywords: ["delay", "shipping time"], 
    response: "Delivery takes 2-5 days based on your location." 
  },
  { 
    keywords: ["driver", "chauffeur"], 
    response: "We don't offer driver services directly, but we can recommend one." 
  },
  { 
    keywords: ["branch", "branches", "locations"], 
    response: "We currently operate from our Nairobi main office." 
  },
  { 
    keywords: ["email"], 
    response: "You can send us your custom requests at info@minyamumotors.com." 
  },
  { 
    keywords: ["quote", "estimate", "pricing"], 
    response: "Let me know which car you’re interested in, and I’ll send a quote." 
  },
  { 
    keywords: ["promotion", "deal", "discount"], 
    response: "We occasionally run promotions. Keep an eye on our homepage!" 
  },
  { 
    keywords: ["how to buy", "purchase", "buy"], 
    response: "Click 'Purchase' on any listing or contact us directly to buy." 
  },
  { 
    keywords: ["looking for a car", "want a car", "find a car", "car search", "help me find a car"], 
    response: "I can help you with that! What type of car are you looking for? You can specify the make, model, or features you're interested in." 
  },
  { 
    keywords: ["engine type", "fuel type", "engine"], 
    response: "We offer cars with different engine types: petrol, diesel, and hybrid. Let me know your preference." 
  },
  { 
    keywords: ["car brands", "car makes", "brands", "makes"], 
    response: "We have a variety of brands including Toyota, Nissan, BMW, and more. What are you looking for?" 
  },
  { 
    keywords: ["car features", "car specs", "car details"], 
    response: "Each car comes with detailed specifications. Feel free to ask about a specific car, and I'll share the details." 
  },
  { 
    keywords: ["car comparison", "compare cars"], 
    response: "Would you like to compare two or more cars? Let me know the models, and I'll give you a comparison." 
  },
  { 
    keywords: ["financing options", "loan options", "payment plans"], 
    response: "We offer various financing plans. You can choose between monthly installments or a lump-sum payment plan." 
  },
  { 
    keywords: ["credit score", "loan approval", "approve loan"], 
    response: "We work with multiple financing partners, and loan approval depends on your credit score and financial history." 
  },
  { 
    keywords: ["payment methods", "pay", "pay online"], 
    response: "We accept payments via mobile money, bank transfer, and credit/debit cards." 
  },
  { 
    keywords: ["test drive location", "book test drive location"], 
    response: "You can book a test drive at any of our locations across Nairobi. Let me know which one works best for you." 
  },
  { 
    keywords: ["delivery service", "car delivery", "car shipping"], 
    response: "We offer delivery services to major cities in Kenya. Let me know your location, and we can arrange shipping." 
  },
  { 
    keywords: ["damaged cars", "salvage cars", "accident cars"], 
    response: "We only sell cars that meet our quality standards. If you're looking for something specific, feel free to ask!" 
  },
  { 
    keywords: ["car reviews", "car ratings", "reviews"], 
    response: "You can find detailed reviews and ratings for each car model on our website." 
  },
  { 
    keywords: ["test drive experience", "test drive feedback"], 
    response: "We value your feedback! If you've experienced a test drive, feel free to share your thoughts with us." 
  },
  { 
    keywords: ["car condition", "car inspection", "car check"], 
    response: "All our cars undergo a thorough inspection. If you'd like more details, I can share the inspection reports with you." 
  },
  { 
    keywords: ["car registration", "documents", "title"], 
    response: "Our cars come with full documentation. We'll ensure everything is in order when you purchase." 
  },
  { 
    keywords: ["fuel efficiency", "mileage", "mpg"], 
    response: "Our cars are fuel-efficient, with varying mileage depending on the model. I can provide exact numbers if you're interested." 
  },
  { 
    keywords: ["imported cars", "imported vehicles", "overseas cars"], 
    response: "Some of our cars are imported from trusted overseas markets. You can ask about specific models." 
  },
  { 
    keywords: ["vehicle registration", "license plate", "car papers"], 
    response: "All our cars come with the required paperwork and valid registration for sale." 
  },
  { 
    keywords: ["payment plans", "pay over time", "financing rate"], 
    response: "We offer flexible financing with various plans depending on your budget. Feel free to ask for more details." 
  },
  { 
    keywords: ["interest rate", "loan rate"], 
    response: "Interest rates vary based on the financing plan you choose. I'll connect you with our team to discuss your options." 
  },
  { 
    keywords: ["documents needed", "car purchase documents"], 
    response: "You will need your national ID, proof of address, and proof of income to proceed with the purchase." 
  },
  { 
    keywords: ["down payment amount", "minimum down payment"], 
    response: "A minimum 20% down payment is required for financing." 
  },
  { 
    keywords: ["security deposit", "deposit for car"], 
    response: "A refundable security deposit may be required to secure a car until financing is finalized." 
  },
  { 
    keywords: ["financing partner", "loan provider", "loan agency"], 
    response: "We partner with trusted financing agencies to provide you with the best loan options." 
  },
  { 
    keywords: ["loan approval time", "how long for approval", "loan processing time"], 
    response: "Loan approvals typically take 1-3 business days. We'll keep you updated throughout the process." 
  },
  { 
    keywords: ["car delivery time", "shipping duration"], 
    response: "Delivery usually takes 2-5 business days, depending on your location." 
  },
  { 
    keywords: ["car pickup", "car collection time"], 
    response: "If you prefer to pick up your car, we can schedule a convenient time at our Nairobi office." 
  },
  { 
    keywords: ["maintenance service", "car service", "car checkup"], 
    response: "We can help you schedule a maintenance checkup with our certified service providers." 
  },
  { 
    keywords: ["service center", "mechanic near me", "car repair near me"], 
    response: "We can recommend certified mechanics and service centers near your location." 
  }
];

const getResponse = (input) => {
  const message = input.toLowerCase();
  for (const faq of faqResponses) {
    if (faq.keywords.some(keyword => message.includes(keyword))) {
      return faq.response;
    }
  }
  return "I'm here to help with anything car-related. Could you please clarify your question?";
};

const ChatBot = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{ text: "Hi there! I'm Lily, your assistant. How can I help you today?", sender: 'bot' }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setTimeout(() => {
      const botResponse = getResponse(input);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setLoading(false);
    }, 800);
    setInput('');
  };

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-card" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <strong>Lily - Assistant</strong>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="loading-dots"><span></span><span></span><span></span></div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
