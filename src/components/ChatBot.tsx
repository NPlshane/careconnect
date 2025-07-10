import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your CareConnect assistant. How can I help you today? I can assist with health questions, medication reminders, appointment scheduling, and more.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('medication') || lowerInput.includes('medicine')) {
      return 'I can help you with medication reminders! Would you like me to set up a reminder schedule for your medications? Please consult with your doctor or pharmacist for specific medication advice.';
    }
    
    if (lowerInput.includes('appointment') || lowerInput.includes('doctor')) {
      return 'I can help you manage your appointments. Would you like me to remind you about upcoming appointments or help you prepare questions for your doctor?';
    }
    
    if (lowerInput.includes('emergency') || lowerInput.includes('help')) {
      return 'If this is a medical emergency, please call 911 immediately. For non-emergency health concerns, I recommend contacting your healthcare provider. Is there something specific I can help you with?';
    }
    
    if (lowerInput.includes('pain') || lowerInput.includes('hurt')) {
      return 'I understand you\'re experiencing discomfort. While I can\'t provide medical diagnosis, I recommend speaking with your healthcare provider about any persistent pain. In the meantime, would you like some general wellness tips?';
    }
    
    return 'Thank you for your message. I\'m here to help with health-related questions, medication reminders, appointment scheduling, and wellness tips. How else can I assist you today?';
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-end justify-center p-4">
      <div className="bg-card rounded-t-3xl w-full max-w-4xl h-[85vh] max-h-[85vh] flex flex-col shadow-2xl border-4 border-primary/20 mb-20">
        {/* Header */}
        <div className="bg-primary p-6 rounded-t-3xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={28} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground">AI Health Assistant</h3>
              <p className="text-lg text-primary-foreground/80">Here to help you</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="elderly-button bg-white/20 hover:bg-white/30 !p-3 !min-h-12 !min-w-12"
          >
            <X size={24} className="text-primary-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-secondary' : 'bg-primary'}`}>
                  {message.sender === 'user' ? (
                    <User size={20} className="text-secondary-foreground" />
                  ) : (
                    <Bot size={20} className="text-primary-foreground" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="elderly-text leading-relaxed">{message.text}</p>
                  <p className="text-sm opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={20} className="text-primary-foreground" />
                </div>
                <div className="bg-muted p-4 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t-2 border-border flex-shrink-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={startVoiceRecognition}
              className={`elderly-button !p-4 !min-h-14 !min-w-14 flex-shrink-0 ${
                isListening 
                  ? 'bg-destructive hover:bg-destructive/80 text-destructive-foreground' 
                  : 'bg-accent hover:bg-accent/80'
              }`}
              disabled={isLoading}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use voice..."
              className="flex-1 elderly-text p-4 bg-background border-2 border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-ring min-w-0"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="elderly-button bg-primary hover:bg-primary/80 !p-4 !min-h-14 !min-w-14 flex-shrink-0"
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
