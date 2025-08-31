import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, ChevronsLeft, ChevronsRight, Heart, Home, ArrowRight, BookOpen, Clock, Settings, Zap, Loader2 } from "lucide-react";
import { Leaf } from "lucide-react";

// --- Mock shadcn/ui components for a single file ---

const Button = ({ children, className, variant, onClick, disabled, type, title }) => {
  const baseClasses = "flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium";
  let variantClasses = "";
  if (variant === "secondary") {
    variantClasses = "bg-purple-100 text-purple-800 hover:bg-purple-200";
  } else if (variant === "ghost") {
    variantClasses = "text-gray-700 hover:bg-gray-100";
  } else if (variant === "outline") {
    variantClasses = "border border-gray-300 text-gray-700 hover:bg-gray-100";
  } else {
    variantClasses = "bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-500/50";
  }

  if (disabled) {
    variantClasses = "bg-gray-100 text-gray-400 cursor-not-allowed";
  }

  return (
    <button type={type} className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick} disabled={disabled} title={title}>
      {children}
    </button>
  );
};

// --- Chatbot Specific Components ---

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-md p-4 rounded-xl shadow-lg text-base transition-transform transform ${
          isUser
            ? 'bg-purple-600 text-white rounded-br-none shadow-purple-600/40'
            : 'bg-white text-gray-800 rounded-bl-none shadow-gray-200/50'
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

// --- Main Chat App Component ---

const Sidebar = ({ collapsed, setCollapsed, activePage, setActivePage }) => {
  const menuItems = [
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "mindfulness", label: "Mindfulness", icon: Zap },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "history", label: "History", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`bg-white border-r transition-all duration-300 flex flex-col shadow-lg z-10 ${
        collapsed ? "w-16" : "w-64"
      } ${collapsed ? 'sm:w-16' : 'sm:w-64'}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && <div className="flex items-center">
            <Leaf size={30} className="h-7 w-7 text-purple-600 mr-2" />
            <h2 className="font-bold text-2xl text-purple-800">SahajChat</h2>
        </div>}
        <Button
          variant="ghost"
          className="rounded-full w-8 h-8 p-0"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activePage === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start ${collapsed ? 'p-2' : ''}`}
            onClick={() => setActivePage(item.id)}
            title={item.label}
          >
            <item.icon className={`h-5 w-5 ${!collapsed ? "mr-3" : ""}`} />
            {!collapsed && <span className="text-base">{item.label}</span>}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default function AiRender() {
  const [activePage, setActivePage] = useState("chat");
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Placeholder URL for your backend API
  const backendUrl = "/api/chat";

  // Function to scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input.trim() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Simulate sending the message to your backend
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await response.json();
      const botResponseText = data.botResponse || "I'm sorry, I couldn't get a response right now. Please try again.";

      const botMessage = { sender: 'bot', text: botResponseText };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Error sending message to backend:", error);
      const errorMessage = { sender: 'bot', text: "I'm sorry, something went wrong. Please try again later." };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setIsLoading(false);
    setInput('');
  };

  const renderContent = () => {
    if (activePage !== "chat") {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-600">
          <p className="text-xl mb-4">You've reached the {activePage} section.</p>
          <p className="max-w-md">This area is currently under construction. Please return to the chat to continue our conversation.</p>
          <Button onClick={() => setActivePage("chat")} className="mt-6">
            Go to Chat
          </Button>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col p-6 overflow-hidden bg-gray-50">
        <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-4">
          <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <Leaf className="h-16 w-16 text-purple-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Welcome to SahajChat</h2>
            <p className="text-gray-600 max-w-lg">
              I'm here to listen without judgment. Whether you want to share your thoughts, talk about your feelings, or just have a safe space to express yourself, I'm here for you. You can start by simply saying hello.
            </p>
          </div>
          {messages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="flex-shrink-0 mt-4 flex items-center space-x-2 bg-white rounded-xl shadow-lg shadow-gray-200/50 p-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                }
            }}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border-none focus:outline-none resize-none overflow-hidden h-10"
            rows="1"
            style={{ minHeight: '40px', maxHeight: '120px' }}
            disabled={isLoading}
          />
          <Button type="submit" className="w-10 h-10 p-0 rounded-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </form>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
          <h1 className="text-xl font-bold">
            {activePage === "chat" ? "SahajChat" : activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="rounded-full w-8 h-8 p-0">
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
