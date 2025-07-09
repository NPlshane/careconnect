
import { Heart, MessageCircle, Calendar, Brain, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Index = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const greetingIcon = currentHour < 18 ? Sun : Moon;
  const GreetingIcon = greetingIcon;

  const features = [
    {
      title: 'Daily Checkup',
      description: 'Track your mood and complete wellness surveys',
      icon: Heart,
      path: '/checkup',
      color: 'bg-primary hover:bg-primary/80',
    },
    {
      title: 'Chat & Video Calls',
      description: 'Connect with family, friends, and healthcare providers',
      icon: MessageCircle,
      path: '/chat',
      color: 'bg-secondary hover:bg-secondary/80',
    },
    {
      title: 'Community Events',
      description: 'Discover local activities and social gatherings',
      icon: Calendar,
      path: '/events',
      color: 'bg-accent hover:bg-accent/80',
    },
    {
      title: 'Brain Training',
      description: 'Keep your mind sharp with fun cognitive games',
      icon: Brain,
      path: '/games',
      color: 'bg-primary hover:bg-primary/80',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card shadow-sm p-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-primary">CareConnect</h1>
            <GreetingIcon className="text-primary" size={40} />
          </div>
          <p className="elderly-text text-muted-foreground">
            {greeting}! Welcome to your health and wellness companion.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6">
        {/* Quick Stats */}
        <div className="elderly-card bg-card mb-8">
          <h2 className="elderly-heading">Today at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary/20 rounded-xl">
              <Heart className="mx-auto mb-2 text-primary" size={32} />
              <p className="text-2xl font-bold">Good</p>
              <p className="elderly-text text-muted-foreground">Today's Mood</p>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-xl">
              <MessageCircle className="mx-auto mb-2 text-secondary" size={32} />
              <p className="text-2xl font-bold">3</p>
              <p className="elderly-text text-muted-foreground">New Messages</p>
            </div>
            <div className="text-center p-4 bg-accent/20 rounded-xl">
              <Calendar className="mx-auto mb-2 text-accent" size={32} />
              <p className="text-2xl font-bold">2</p>
              <p className="elderly-text text-muted-foreground">Upcoming Events</p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {features.map(({ title, description, icon: Icon, path, color }) => (
            <Link
              key={title}
              to={path}
              className={`elderly-card ${color} block transform hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/30 rounded-xl">
                  <Icon size={40} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="elderly-text opacity-90">{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="elderly-card bg-destructive/10 border-2 border-destructive/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-destructive mb-2">Emergency Contact</h3>
              <p className="elderly-text text-muted-foreground">
                Need immediate help? Call your emergency contact or 911.
              </p>
            </div>
            <button className="elderly-button bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Call Now
            </button>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Index;
