
import { useState } from 'react';
import { ArrowLeft, MessageCircle, Video, Phone, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Chat = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'calls'>('chat');

  const contacts = [
    { id: 1, name: 'Dr. Smith', role: 'Family Doctor', status: 'online', lastMessage: 'Your test results look good!' },
    { id: 2, name: 'Sarah (Daughter)', role: 'Family', status: 'online', lastMessage: 'Love you mom! Call me later.' },
    { id: 3, name: 'Mike (Son)', role: 'Family', status: 'away', lastMessage: 'Thanks for the birthday wishes!' },
    { id: 4, name: 'Nurse Jennifer', role: 'Healthcare', status: 'online', lastMessage: 'Reminder: Take evening medication' },
    { id: 5, name: 'Mary (Neighbor)', role: 'Friend', status: 'offline', lastMessage: 'See you at the community center!' },
  ];

  const recentCalls = [
    { id: 1, name: 'Sarah (Daughter)', type: 'video', time: '2 hours ago', duration: '45 min' },
    { id: 2, name: 'Dr. Smith', type: 'voice', time: 'Yesterday', duration: '12 min' },
    { id: 3, name: 'Mike (Son)', type: 'video', time: '2 days ago', duration: '23 min' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

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
              <h1 className="text-4xl font-bold text-primary">Chat & Calls</h1>
              <p className="elderly-text text-muted-foreground">
                Stay connected with family and healthcare providers
              </p>
            </div>
            <button className="elderly-button bg-primary hover:bg-primary/80 p-4">
              <Plus size={24} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`elderly-button ${
                activeTab === 'chat' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/80'
              } flex items-center space-x-2`}
            >
              <MessageCircle size={20} />
              <span>Messages</span>
            </button>
            <button
              onClick={() => setActiveTab('calls')}
              className={`elderly-button ${
                activeTab === 'calls' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/80'
              } flex items-center space-x-2`}
            >
              <Phone size={20} />
              <span>Calls</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        {/* Search */}
        <div className="elderly-card bg-card mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={24} />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-14 pr-4 py-4 text-xl bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-ring"
            />
          </div>
        </div>

        {activeTab === 'chat' ? (
          /* Chat Contacts */
          <div className="space-y-4">
            <h2 className="elderly-heading">Recent Conversations</h2>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="elderly-card bg-card hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="text-primary" size={24} />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(contact.status)} rounded-full border-2 border-white`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{contact.name}</h3>
                      <span className="text-sm text-muted-foreground">{contact.role}</span>
                    </div>
                    <p className="elderly-text text-muted-foreground truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="p-3 bg-primary hover:bg-primary/80 rounded-lg transition-colors">
                      <MessageCircle size={20} />
                    </button>
                    <button className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                      <Video size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Recent Calls */
          <div className="space-y-4">
            <h2 className="elderly-heading">Recent Calls</h2>
            {recentCalls.map((call) => (
              <div
                key={call.id}
                className="elderly-card bg-card hover:shadow-xl cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                    {call.type === 'video' ? (
                      <Video className="text-secondary" size={24} />
                    ) : (
                      <Phone className="text-secondary" size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{call.name}</h3>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <span className="elderly-text">{call.time}</span>
                      <span className="elderly-text">Duration: {call.duration}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="elderly-button bg-primary hover:bg-primary/80 p-4">
                      <Phone size={20} />
                    </button>
                    <button className="elderly-button bg-secondary hover:bg-secondary/80 p-4">
                      <Video size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Emergency Call Button */}
        <div className="elderly-card bg-destructive/10 border-2 border-destructive/20 mt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-destructive mb-4">Emergency Call</h3>
            <p className="elderly-text text-muted-foreground mb-6">
              Need immediate help? Press the button below to call emergency services.
            </p>
            <button className="elderly-button bg-destructive text-destructive-foreground hover:bg-destructive/90 text-2xl font-bold">
              Call 911
            </button>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Chat;
