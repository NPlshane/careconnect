
import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'health' | 'social' | 'exercise'>('all');

  const events = [
    {
      id: 1,
      title: 'Morning Yoga Class',
      category: 'exercise',
      date: 'Today, 9:00 AM',
      location: 'Community Center - Room A',
      attendees: 12,
      maxAttendees: 15,
      description: 'Gentle yoga for seniors. All skill levels welcome.',
      isJoined: true,
    },
    {
      id: 2,
      title: 'Heart Health Workshop',
      category: 'health',
      date: 'Tomorrow, 2:00 PM',
      location: 'Health Clinic - Conference Room',
      attendees: 8,
      maxAttendees: 20,
      description: 'Learn about maintaining cardiovascular health with Dr. Johnson.',
      isJoined: false,
    },
    {
      id: 3,
      title: 'Book Club Meeting',
      category: 'social',
      date: 'Friday, 10:00 AM',
      location: 'Public Library - Reading Room',
      attendees: 6,
      maxAttendees: 12,
      description: 'Discussing "The Seven Husbands of Evelyn Hugo" this week.',
      isJoined: true,
    },
    {
      id: 4,
      title: 'Walking Group',
      category: 'exercise',
      date: 'Saturday, 8:00 AM',
      location: 'Central Park - Main Entrance',
      attendees: 15,
      maxAttendees: 25,
      description: 'Join us for a leisurely walk around the park.',
      isJoined: false,
    },
    {
      id: 5,
      title: 'Medication Management Seminar',
      category: 'health',
      date: 'Next Monday, 11:00 AM',
      location: 'Senior Center - Hall B',
      attendees: 20,
      maxAttendees: 30,
      description: 'Tips for organizing and remembering your medications.',
      isJoined: false,
    },
    {
      id: 6,
      title: 'Coffee & Cards Social',
      category: 'social',
      date: 'Next Tuesday, 1:00 PM',
      location: 'Community Café',
      attendees: 10,
      maxAttendees: 16,
      description: 'Friendly card games and conversation over coffee.',
      isJoined: true,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Events', color: 'bg-primary' },
    { id: 'health', label: 'Health', color: 'bg-red-200' },
    { id: 'social', label: 'Social', color: 'bg-blue-200' },
    { id: 'exercise', label: 'Exercise', color: 'bg-green-200' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-red-100 text-red-800';
      case 'social': return 'bg-blue-100 text-blue-800';
      case 'exercise': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : events.filter(event => event.category === selectedFilter);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card shadow-sm p-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/" className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
              <ArrowLeft size={28} className="text-primary" />
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-primary">Community Events</h1>
              <p className="elderly-text text-muted-foreground">
                Discover and join local activities
              </p>
            </div>
            <Calendar className="text-primary" size={40} />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filters.map(({ id, label, color }) => (
              <button
                key={id}
                onClick={() => setSelectedFilter(id as any)}
                className={`elderly-button ${
                  selectedFilter === id 
                    ? `${color} ring-4 ring-ring` 
                    : 'bg-secondary hover:bg-secondary/80'
                } flex items-center space-x-2`}
              >
                <Filter size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="elderly-card bg-card hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center space-x-3 mb-2 md:mb-0">
                  <h3 className="text-2xl font-bold">{event.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                {event.isJoined && (
                  <div className="flex items-center space-x-2 text-primary">
                    <Star size={20} fill="currentColor" />
                    <span className="font-medium">Joined</span>
                  </div>
                )}
              </div>

              <p className="elderly-text text-muted-foreground mb-4">
                {event.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Clock className="text-primary" size={20} />
                  <span className="elderly-text">{event.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary" size={20} />
                  <span className="elderly-text">{event.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="text-primary" size={20} />
                  <span className="elderly-text">
                    {event.attendees}/{event.maxAttendees} attendees
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {event.isJoined ? (
                  <>
                    <button className="elderly-button bg-secondary hover:bg-secondary/80 flex-1">
                      View Details
                    </button>
                    <button className="elderly-button bg-red-200 hover:bg-red-300 text-red-800">
                      Leave Event
                    </button>
                  </>
                ) : (
                  <>
                    <button className="elderly-button bg-primary hover:bg-primary/80 flex-1">
                      Join Event
                    </button>
                    <button className="elderly-button bg-secondary hover:bg-secondary/80">
                      More Info
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="elderly-card bg-card text-center py-12">
            <Calendar className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="text-2xl font-bold mb-2">No Events Found</h3>
            <p className="elderly-text text-muted-foreground">
              Try adjusting your filter or check back later for new events.
            </p>
          </div>
        )}

        {/* Suggest Event */}
        <div className="elderly-card bg-accent/20 border-2 border-accent/30 mt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Suggest an Event</h3>
            <p className="elderly-text text-muted-foreground mb-6">
              Have an idea for a community event? Let us know!
            </p>
            <button className="elderly-button bg-accent hover:bg-accent/80">
              Suggest Event
            </button>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Events;
