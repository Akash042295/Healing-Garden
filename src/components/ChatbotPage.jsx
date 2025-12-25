import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for the back button

const ChatbotPage = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I am Doctor Botanist. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);
    const navigate = useNavigate(); // Navigation hook

    // Automatically scrolls the chat history to the bottom when a new message arrives
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to the UI
        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');

        try {
            // FIXED: Updated URL to match your backend route "/api/chat"
            const response = await fetch('http://localhost:5000/api/chat', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: currentInput }),
            });

            const data = await response.json();
            
            // Add the bot's response from the AI service to the chat
            setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
        } catch (error) {
            console.error("Chat Connection Error:", error);
            setMessages(prev => [...prev, { text: "I'm having trouble connecting to my lab!", sender: 'bot' }]);
        }
    };

    return (
        <div className="subpage-container chat-page-layout">
            <div className="chat-centered-box">
                {/* Dark Green Rectangle Header with Back Button */}
                <div className="chat-box-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                        onClick={() => navigate('/')} 
                        style={{ background: 'none', border: '1px solid white', color: 'white', borderRadius: '5px', cursor: 'pointer', padding: '5px 10px' }}
                    >
                        ← Back
                    </button>
                    <span style={{ flex: 1, textAlign: 'center', marginRight: '60px' }}>Doctor Chatbot</span>
                </div>

                {/* Main Messaging Area */}
                <div className="chat-history">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-row ${msg.sender}`}>
                            <div className="chat-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* User Input Bar */}
                <div className="chat-input-area">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Describe your symptoms or ask about herbs..."
                    />
                    <button onClick={handleSendMessage} className="chat-send-btn">Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;