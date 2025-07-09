
import { useState } from 'react';
import { ArrowLeft, Brain, Star, Play, Trophy, Timer, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'memory' | 'logic' | 'word'>('all');

  const games = [
    {
      id: 1,
      title: 'Memory Cards',
      category: 'memory',
      difficulty: 'Easy',
      description: 'Match pairs of cards to improve memory and concentration.',
      rating: 4.8,
      playTime: '5-10 min',
      played: true,
      bestScore: 85,
      icon: '🃏',
    },
    {
      id: 2,
      title: 'Word Search',
      category: 'word',
      difficulty: 'Medium',
      description: 'Find hidden words in a grid of letters.',
      rating: 4.6,
      playTime: '10-15 min',
      played: true,
      bestScore: 92,
      icon: '🔤',
    },
    {
      id: 3,
      title: 'Sudoku Puzzles',
      category: 'logic',
      difficulty: 'Hard',
      description: 'Fill the grid with numbers using logic and reasoning.',
      rating: 4.7,
      playTime: '15-25 min',
      played: false,
      bestScore: 0,
      icon: '🔢',
    },
    {
      id: 4,
      title: 'Pattern Recognition',
      category: 'logic',
      difficulty: 'Medium',
      description: 'Identify and complete visual patterns.',
      rating: 4.5,
      playTime: '5-8 min',
      played: true,
      bestScore: 78,
      icon: '🧩',
    },
    {
      id: 5,
      title: 'Crossword Puzzles',
      category: 'word',
      difficulty: 'Medium',
      description: 'Classic crossword puzzles with varying themes.',
      rating: 4.9,
      playTime: '20-30 min',
      played: true,
      bestScore: 95,
      icon: '📝',
    },
    {
      id: 6,
      title: 'Number Sequence',
      category: 'memory',
      difficulty: 'Easy',
      description: 'Remember and repeat number sequences.',
      rating: 4.4,
      playTime: '3-5 min',
      played: false,
      bestScore: 0,
      icon: '🔢',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Games', color: 'bg-primary' },
    { id: 'memory', label: 'Memory', color: 'bg-purple-200' },
    { id: 'logic', label: 'Logic', color: 'bg-blue-200' },
    { id: 'word', label: 'Word', color: 'bg-green-200' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

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
              <h1 className="text-4xl font-bold text-primary">Brain Training</h1>
              <p className="elderly-text text-muted-foreground">
                Keep your mind sharp with fun cognitive games
              </p>
            </div>
            <Brain className="text-primary" size={40} />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map(({ id, label, color }) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id as any)}
                className={`elderly-button ${
                  selectedCategory === id 
                    ? `${color} ring-4 ring-ring` 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        {/* Stats Overview */}
        <div className="elderly-card bg-card mb-8">
          <h2 className="elderly-heading">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary/20 rounded-xl">
              <Trophy className="mx-auto mb-2 text-primary" size={32} />
              <p className="text-2xl font-bold">12</p>
              <p className="elderly-text text-muted-foreground">Games Completed</p>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-xl">
              <Target className="mx-auto mb-2 text-secondary" size={32} />
              <p className="text-2xl font-bold">87%</p>
              <p className="elderly-text text-muted-foreground">Average Score</p>
            </div>
            <div className="text-center p-4 bg-accent/20 rounded-xl">
              <Timer className="mx-auto mb-2 text-accent" size={32} />
              <p className="text-2xl font-bold">45m</p>
              <p className="elderly-text text-muted-foreground">Time Played Today</p>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="elderly-card bg-card hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{game.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-500" size={16} fill="currentColor" />
                        <span className="text-sm font-medium">{game.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="elderly-text text-muted-foreground mb-4">
                {game.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Timer size={16} />
                    <span>{game.playTime}</span>
                  </div>
                  {game.played && (
                    <div className="flex items-center space-x-1">
                      <Trophy size={16} />
                      <span>Best: {game.bestScore}%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="elderly-button bg-primary hover:bg-primary/80 flex-1 flex items-center justify-center space-x-2">
                  <Play size={20} />
                  <span>{game.played ? 'Play Again' : 'Start Game'}</span>
                </button>
                <button className="elderly-button bg-secondary hover:bg-secondary/80 px-4">
                  ℹ️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Challenge */}
        <div className="elderly-card bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30">
          <div className="text-center">
            <h3 className="elderly-heading flex items-center justify-center">
              <Trophy className="mr-3 text-primary" size={36} />
              Daily Challenge
            </h3>
            <p className="elderly-text text-muted-foreground mb-6">
              Complete today's special challenge for bonus points!
            </p>
            <div className="bg-white/50 rounded-xl p-4 mb-6">
              <h4 className="text-xl font-bold mb-2">Memory Marathon</h4>
              <p className="elderly-text">Remember 8 cards in sequence - Can you beat your personal best?</p>
            </div>
            <button className="elderly-button bg-primary hover:bg-primary/80 text-xl">
              Accept Challenge
            </button>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Games;
