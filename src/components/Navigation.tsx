
import { Heart, MessageCircle, Calendar, Brain, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'bg-primary' },
    { path: '/checkup', icon: Heart, label: 'Daily Checkup', color: 'bg-secondary' },
    { path: '/chat', icon: MessageCircle, label: 'Chat & Calls', color: 'bg-accent' },
    { path: '/events', icon: Calendar, label: 'Community', color: 'bg-primary' },
    { path: '/games', icon: Brain, label: 'Brain Games', color: 'bg-secondary' },
  ];

  return (
    <nav className="bg-card border-t-4 border-primary p-4 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-around items-center max-w-6xl mx-auto">
        {navItems.map(({ path, icon: Icon, label, color }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `elderly-button flex flex-col items-center space-y-2 ${color} ${
                isActive ? 'ring-4 ring-ring' : ''
              } hover:bg-opacity-80`
            }
          >
            <Icon size={32} />
            <span className="text-sm font-medium text-center">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
