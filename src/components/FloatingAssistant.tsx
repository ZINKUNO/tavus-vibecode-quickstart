import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { MessageCircle, X, Sparkles, Video } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { TavusAPI } from '../lib/tavus';
import { tavusConversationAtom, isCreatingConversationAtom } from '../store/tavus';

export const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useAtom(tavusConversationAtom);
  const [isCreating, setIsCreating] = useAtom(isCreatingConversationAtom);
  const [inputText, setInputText] = useState('');

  const startTavusConversation = async () => {
    setIsCreating(true);
    try {
      // Replace with your actual API key and persona/replica IDs
      const tavus = new TavusAPI('your-api-key-here');
      const newConversation = await tavus.createConversation({
        persona_id: 'your-persona-id',
        replica_id: 'your-replica-id',
        custom_greeting: 'Hi! I\'m your AI creator assistant. How can I help you create amazing content today?',
        conversational_context: 'You are an AI assistant specialized in helping content creators with video generation, social media strategy, and brand development.',
      });
      
      setConversation(newConversation);
    } catch (error) {
      console.error('Failed to create Tavus conversation:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const endTavusConversation = async () => {
    if (conversation) {
      try {
        const tavus = new TavusAPI('your-api-key-here');
        await tavus.endConversation(conversation.conversation_id);
        setConversation(null);
      } catch (error) {
        console.error('Failed to end Tavus conversation:', error);
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-glass backdrop-blur-md border border-white/20 shadow-2xl animate-float"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(139, 92, 246, 0.3))',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Expanded Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px]"
          >
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neon-gradient flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">AI Assistant</h3>
                      <p className="text-xs text-white/60">Powered by Tavus</p>
                    </div>
                  </div>
                  {conversation && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={endTavusConversation}
                      className="text-red-400 hover:text-red-300"
                    >
                      End Call
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {conversation ? (
                  <div className="h-full">
                    <iframe
                      src={conversation.conversation_url}
                      allow="camera; microphone; fullscreen; display-capture"
                      className="w-full h-full rounded-lg border-0"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                      <p className="text-sm text-white">
                        👋 Hi! I'm your AI assistant. I can help you:
                      </p>
                      <ul className="text-xs text-white/80 mt-2 space-y-1">
                        <li>• Create personalized videos</li>
                        <li>• Generate brand content</li>
                        <li>• Schedule social posts</li>
                        <li>• Write marketing copy</li>
                      </ul>
                    </div>
                    
                    <Button
                      onClick={startTavusConversation}
                      disabled={isCreating}
                      className="w-full"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      {isCreating ? 'Starting...' : 'Start Video Chat'}
                    </Button>
                  </div>
                )}
              </div>

              {!conversation && (
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-white/10 border-white/20 text-white text-sm placeholder-white/50"
                    />
                    <Button size="sm" className="px-3">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};