
import { Heart, MessageCircle, Calendar, Brain, Sun, Moon, Menu, Plus, Minus, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import ChatBot from '../components/ChatBot';

const Index = () => {
  const [textZoom, setTextZoom] = useState(3); // Default zoom level
  const [showChatBot, setShowChatBot] = useState(false);
  
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const greetingIcon = currentHour < 18 ? Sun : Moon;
  const GreetingIcon = greetingIcon;

  const features = [
    {
      title: 'Daily Checkup',
      description: 'Track your mood and wellness',
      icon: Heart,
      path: '/checkup',
      color: 'bg-primary hover:bg-primary/80',
    },
    {
      title: 'Chat & Calls',
      description: 'Connect with family and doctors',
      icon: MessageCircle,
      path: '/chat',
      color: 'bg-secondary hover:bg-secondary/80',
    },
    {
      title: 'Community',
      description: 'Local events and activities',
      icon: Calendar,
      path: '/events',
      color: 'bg-accent hover:bg-accent/80',
    },
    {
      title: 'Brain Games',
      description: 'Keep your mind sharp',
      icon: Brain,
      path: '/games',
      color: 'bg-primary hover:bg-primary/80',
    },
  ];

  const adjustTextSize = (increment: boolean) => {
    setTextZoom(prev => {
      const newZoom = increment ? Math.min(prev + 1, 5) : Math.max(prev - 1, 1);
      document.documentElement.style.fontSize = `${14 + (newZoom * 2)}px`;
      return newZoom;
    });
  };

  return (
    <div className={`min-h-screen bg-background pb-24 text-zoom-${textZoom}`}>
      {/* Magnification Controls */}
      <div className="magnify-controls">
        <div className="flex items-center space-x-3">
          <span className="elderly-text font-semibold">Text Size</span>
          <button
            onClick={() => adjustTextSize(false)}
            className="elderly-button bg-secondary hover:bg-secondary/80 !p-3 !min-h-12 !min-w-12"
            disabled={textZoom === 1}
          >
            <Minus size={20} />
          </button>
          <span className="elderly-text font-bold bg-primary/20 px-3 py-1 rounded-lg">
            {textZoom}
          </span>
          <button
            onClick={() => adjustTextSize(true)}
            className="elderly-button bg-secondary hover:bg-secondary/80 !p-3 !min-h-12 !min-w-12"
            disabled={textZoom === 5}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <header className="bg-card shadow-lg px-6 py-6 sticky top-0 z-40 border-b-4 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="elderly-button bg-primary/20 hover:bg-primary/30 !p-4">
              <Menu size={28} className="text-primary" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-primary mb-1">CareConnect</h1>
              <p className="elderly-text text-muted-foreground">{greeting}</p>
            </div>
          </div>
          <GreetingIcon className="text-primary" size={40} />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-8">
        {/* Quick Stats Card */}
        <div className="elderly-card bg-card">
          <h2 className="elderly-heading">Today's Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-6 bg-primary/10 rounded-2xl border-2 border-primary/20">
              <Heart className="mx-auto mb-3 text-primary" size={36} />
              <p className="text-2xl font-bold mb-1">Good</p>
              <p className="elderly-text text-muted-foreground">Mood</p>
            </div>
            <div className="text-center p-6 bg-secondary/10 rounded-2xl border-2 border-secondary/20">
              <MessageCircle className="mx-auto mb-3 text-secondary" size={36} />
              <p className="text-2xl font-bold mb-1">3</p>
              <p className="elderly-text text-muted-foreground">Messages</p>
            </div>
            <div className="text-center p-6 bg-accent/10 rounded-2xl border-2 border-accent/20">
              <Calendar className="mx-auto mb-3 text-accent" size={36} />
              <p className="text-2xl font-bold mb-1">2</p>
              <p className="elderly-text text-muted-foreground">Events</p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="space-y-6">
          <h2 className="elderly-heading px-2">Main Features</h2>
          <div className="grid grid-cols-1 gap-6">
            {features.map(({ title, description, icon: Icon, path, color }) => (
              <Link
                key={title}
                to={path}
                className={`${color} elderly-card active:scale-95 transition-all duration-200 block hover:shadow-2xl`}
              >
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-white/30 rounded-2xl">
                    <Icon size={40} className="text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="elderly-subheading mb-2">{title}</h3>
                    <p className="elderly-text opacity-90">{description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="elderly-card bg-destructive/10 border-4 border-destructive/30">
          <div className="text-center">
            <h3 className="elderly-heading text-destructive mb-4">Emergency</h3>
            <p className="elderly-text text-muted-foreground mb-6">
              Need immediate help? Tap to call emergency services.
            </p>
            <button className="elderly-button w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 text-2xl">
              Call 911
            </button>
          </div>
        </div>
      </main>

      {/* AI Chatbot Floating Button */}
      <button
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-24 right-6 elderly-button bg-primary hover:bg-primary/80 rounded-full !p-6 shadow-2xl z-40"
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={32} />
      </button>

      {/* AI Chatbot */}
      {showChatBot && (
        <ChatBot onClose={() => setShowChatBot(false)} />
      )}

      <Navigation />
    </div>
  );
};

export default Index;
