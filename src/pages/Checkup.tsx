
import { useState } from 'react';
import { ArrowLeft, Heart, Smile, Meh, Frown, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Checkup = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);

  const moods = [
    { id: 'excellent', label: 'Excellent', icon: ThumbsUp, color: 'bg-green-200 hover:bg-green-300' },
    { id: 'good', label: 'Good', icon: Smile, color: 'bg-primary hover:bg-primary/80' },
    { id: 'okay', label: 'Okay', icon: Meh, color: 'bg-secondary hover:bg-secondary/80' },
    { id: 'not-great', label: 'Not Great', icon: Frown, color: 'bg-orange-200 hover:bg-orange-300' },
  ];

  const surveyQuestions = [
    {
      question: 'How well did you sleep last night?',
      options: ['Very well', 'Well', 'Fair', 'Poorly'],
    },
    {
      question: 'Have you taken your medications today?',
      options: ['Yes, all of them', 'Yes, most of them', 'Some of them', 'No, not yet'],
    },
    {
      question: 'How is your energy level today?',
      options: ['Very energetic', 'Good energy', 'Some energy', 'Low energy'],
    },
  ];

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleSurveyAnswer = (answer: string) => {
    const newAnswers = [...surveyAnswers];
    newAnswers[surveyStep] = answer;
    setSurveyAnswers(newAnswers);
    
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    }
  };

  const completedSurvey = surveyAnswers.length === surveyQuestions.length && surveyAnswers.every(answer => answer);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card shadow-sm p-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/" className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
              <ArrowLeft size={28} className="text-primary" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-primary">Daily Checkup</h1>
              <p className="elderly-text text-muted-foreground">
                How are you feeling today?
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        {/* Mood Selection */}
        <div className="elderly-card bg-card mb-8">
          <h2 className="elderly-heading flex items-center">
            <Heart className="mr-3 text-primary" size={36} />
            Select Your Mood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moods.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => handleMoodSelect(id)}
                className={`elderly-button ${color} ${
                  selectedMood === id ? 'ring-4 ring-ring' : ''
                } flex items-center justify-center space-x-3`}
              >
                <Icon size={32} />
                <span className="text-xl">{label}</span>
              </button>
            ))}
          </div>
          {selectedMood && (
            <div className="mt-6 p-4 bg-primary/20 rounded-xl">
              <p className="elderly-text text-center">
                Thank you for sharing! Your mood has been recorded.
              </p>
            </div>
          )}
        </div>

        {/* Health Survey */}
        <div className="elderly-card bg-card mb-8">
          <h2 className="elderly-heading">Quick Health Check</h2>
          
          {surveyStep < surveyQuestions.length ? (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="elderly-text">Question {surveyStep + 1} of {surveyQuestions.length}</span>
                  <div className="bg-primary/20 rounded-full h-3 flex-1 mx-4">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${((surveyStep + 1) / surveyQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-6">
                  {surveyQuestions[surveyStep].question}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {surveyQuestions[surveyStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSurveyAnswer(option)}
                    className="elderly-button bg-secondary hover:bg-secondary/80 text-left"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : completedSurvey ? (
            <div className="text-center py-8">
              <ThumbsUp className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl font-bold mb-4">Checkup Complete!</h3>
              <p className="elderly-text text-muted-foreground mb-6">
                Thank you for completing your daily checkup. Your responses help us understand your wellbeing better.
              </p>
              <Link 
                to="/"
                className="elderly-button bg-primary hover:bg-primary/80 inline-flex items-center"
              >
                Return Home
              </Link>
            </div>
          ) : null}
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Checkup;
