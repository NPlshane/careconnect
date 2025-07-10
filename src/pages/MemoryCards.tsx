
import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Timer, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);

  const cardValues = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌊', '⭐'];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (matches === cardValues.length) {
      setGameWon(true);
      setGameStarted(false);
    }
  }, [matches]);

  const initializeGame = () => {
    const gameCards = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameStarted(false);
    setGameWon(false);
    setTime(0);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card to be flipped
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScore = () => {
    if (!gameWon) return 0;
    const baseScore = 1000;
    const timeBonus = Math.max(0, 300 - time) * 2;
    const moveBonus = Math.max(0, 20 - moves) * 10;
    return baseScore + timeBonus + moveBonus;
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="bg-card shadow-sm p-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/games" className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
              <ArrowLeft size={28} className="text-primary" />
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-primary">Memory Cards</h1>
              <p className="elderly-text text-muted-foreground">
                Match pairs of cards to improve your memory
              </p>
            </div>
            <button
              onClick={initializeGame}
              className="elderly-button bg-secondary hover:bg-secondary/80 !p-4"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        {/* Game Stats */}
        <div className="elderly-card bg-card mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-xl">
              <Timer className="mx-auto mb-2 text-primary" size={28} />
              <p className="text-xl font-bold">{formatTime(time)}</p>
              <p className="elderly-text text-muted-foreground">Time</p>
            </div>
            <div className="text-center p-4 bg-secondary/10 rounded-xl">
              <Target className="mx-auto mb-2 text-secondary" size={28} />
              <p className="text-xl font-bold">{moves}</p>
              <p className="elderly-text text-muted-foreground">Moves</p>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-xl">
              <Trophy className="mx-auto mb-2 text-accent" size={28} />
              <p className="text-xl font-bold">{matches}/{cardValues.length}</p>
              <p className="elderly-text text-muted-foreground">Matches</p>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="elderly-card bg-card mb-6">
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`elderly-button aspect-square !p-0 text-4xl transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? 'bg-primary/20 border-primary/50'
                    : 'bg-secondary hover:bg-secondary/80'
                } ${card.isMatched ? 'ring-4 ring-green-400' : ''}`}
                disabled={card.isFlipped || card.isMatched || flippedCards.length >= 2}
              >
                {card.isFlipped || card.isMatched ? card.value : '❓'}
              </button>
            ))}
          </div>
        </div>

        {/* Game Won Message */}
        {gameWon && (
          <div className="elderly-card bg-gradient-to-r from-green-100 to-green-200 border-4 border-green-400">
            <div className="text-center">
              <Trophy className="mx-auto mb-4 text-green-600" size={48} />
              <h2 className="elderly-heading text-green-800 mb-4">Congratulations!</h2>
              <p className="elderly-text text-green-700 mb-4">
                You completed the game in {formatTime(time)} with {moves} moves!
              </p>
              <div className="bg-white/50 rounded-xl p-4 mb-6">
                <p className="text-2xl font-bold text-green-800">Score: {getScore()}</p>
              </div>
              <button
                onClick={initializeGame}
                className="elderly-button bg-green-600 hover:bg-green-700 text-white"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="elderly-card bg-muted/50">
          <h3 className="elderly-subheading mb-4">How to Play:</h3>
          <ul className="elderly-text space-y-2 text-muted-foreground">
            <li>• Tap cards to flip them over</li>
            <li>• Find matching pairs of cards</li>
            <li>• Complete all matches to win</li>
            <li>• Try to finish with fewer moves for a higher score</li>
          </ul>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default MemoryCards;
