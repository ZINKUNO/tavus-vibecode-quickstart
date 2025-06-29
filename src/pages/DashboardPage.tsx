import React from 'react';
import { motion } from 'framer-motion';
import { ChatInterface } from '../components/assistant/ChatInterface';
import { ControlPanel } from '../components/dashboard/ControlPanel';
import { ContentCalendar } from '../components/dashboard/ContentCalendar';
import { AnalyticsDashboard } from '../components/dashboard/AnalyticsDashboard';
import { VideoGenerator } from '../components/dashboard/VideoGenerator';
import { SocialMediaConnector } from '../components/dashboard/SocialMediaConnector';

export const DashboardPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 font-jakarta">
            Creator Dashboard
          </h1>
          <p className="text-white/70">
            Manage your content, automate your workflow, and grow your audience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - AI Assistant */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="h-[600px]"
          >
            <ChatInterface />
          </motion.div>

          {/* Right Panel - Video Generator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="h-[600px] overflow-y-auto"
          >
            <VideoGenerator />
          </motion.div>
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <SocialMediaConnector />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2"
          >
            <ContentCalendar />
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <AnalyticsDashboard />
          </motion.div>
        </div>
      </div>
    </div>
  );
};