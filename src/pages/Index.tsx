
import { Heart, MessageCircle, Calendar, Brain, Sun, Moon, Menu } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Mobile Header */}
      <header className="bg-card shadow-sm px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-primary/20 rounded-lg">
              <Menu size={24} className="text-primary" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-primary">CareConnect</h1>
              <p className="text-sm text-muted-foreground">{greeting}</p>
            </div>
          </div>
          <GreetingIcon className="text-primary" size={28} />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Quick Stats Card */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Today's Overview</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <Heart className="mx-auto mb-1 text-primary" size={24} />
              <p className="text-lg font-bold">Good</p>
              <p className="text-xs text-muted-foreground">Mood</p>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg">
              <MessageCircle className="mx-auto mb-1 text-secondary" size={24} />
              <p className="text-lg font-bold">3</p>
              <p className="text-xs text-muted-foreground">Messages</p>
            </div>
            <div className="text-center p-3 bg-accent/10 rounded-lg">
              <Calendar className="mx-auto mb-1 text-accent" size={24} />
              <p className="text-lg font-bold">2</p>
              <p className="text-xs text-muted-foreground">Events</p>
            </div>
          </div>
        </div>

        {/* Feature Grid - Mobile Optimized */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold px-1">Main Features</h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map(({ title, description, icon: Icon, path, color }) => (
              <Link
                key={title}
                to={path}
                className={`${color} p-4 rounded-xl shadow-sm active:scale-95 transition-all duration-200 block`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-2 bg-white/30 rounded-lg">
                    <Icon size={28} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-tight">{title}</h3>
                    <p className="text-xs opacity-90 mt-1">{description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Emergency Contact - Mobile Optimized */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-destructive mb-2">Emergency</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Need immediate help? Tap to call emergency services.
            </p>
            <button className="w-full bg-destructive text-destructive-foreground py-3 px-6 rounded-lg font-semibold text-lg active:scale-95 transition-transform">
              Call 911
            </button>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Index;
