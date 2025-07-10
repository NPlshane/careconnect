
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import Index from "./pages/Index";
import Checkup from "./pages/Checkup";
import Chat from "./pages/Chat";
import Events from "./pages/Events";
import Games from "./pages/Games";
import MemoryCards from "./pages/MemoryCards";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkup" element={<Checkup />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/events" element={<Events />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/memory-cards" element={<MemoryCards />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global AI Chatbot Floating Button */}
          <button
            onClick={() => setShowChatBot(true)}
            className="fixed bottom-28 right-6 elderly-button bg-primary hover:bg-primary/80 rounded-full !p-6 shadow-2xl z-[60]"
            aria-label="Open AI Assistant"
          >
            <MessageSquare size={32} />
          </button>

          {/* Global AI Chatbot */}
          {showChatBot && (
            <ChatBot onClose={() => setShowChatBot(false)} />
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
