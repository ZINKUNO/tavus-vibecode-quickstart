import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { ContentCalendar } from '../components/dashboard/ContentCalendar';
import { AnalyticsDashboard } from '../components/dashboard/AnalyticsDashboard';
import { VideoGenerator } from '../components/dashboard/VideoGenerator';
import { SocialMediaConnector } from '../components/dashboard/SocialMediaConnector';
import { userAtom, profileAtom } from '../store/auth';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { LogOut, User } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [profile] = useAtom(profileAtom);
  const { signOut } = useAuth();

  if (!user) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-white/70">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 font-jakarta">
                  Welcome, {profile?.full_name || user.email}!
                </h1>
                <p className="text-white/70">
                  Manage your content, automate your workflow, and grow your audience
                </p>
              </div>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - Video Generator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="h-[600px] overflow-y-auto"
          >
            <VideoGenerator />
          </motion.div>

          {/* Right Panel - Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="h-[600px] overflow-y-auto"
          >
            <SocialMediaConnector />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <ContentCalendar />
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <AnalyticsDashboard />
          </motion.div>
        </div>
      </div>
    </div>
  );
};