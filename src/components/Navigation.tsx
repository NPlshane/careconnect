
import { Heart, MessageCircle, Calendar, Brain, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/checkup', icon: Heart, label: 'Checkup' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/games', icon: Brain, label: 'Games' },
  ];

  return (
    <nav className="bg-card border-t border-border fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`
            }
          >
            <Icon size={20} className="mb-1" />
            <span className="text-xs font-medium truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
