import React from 'react';
import { Link } from 'react-router';

const StartingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to {}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              ThoughtPad
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Your personal space to capture ideas, organize thoughts, and never lose track of what matters most.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card bg-base-200 shadow-xl border border-primary/20">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="card-title text-primary">Create Notes</h3>
              <p className="text-base-content/70">
                Write and organize your thoughts with our intuitive editor
              </p>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl border border-primary/20">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="card-title text-primary">Easy Search</h3>
              <p className="text-base-content/70">
                Find your notes quickly with powerful search functionality
              </p>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl border border-primary/20">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="card-title text-primary">Cloud Sync</h3>
              <p className="text-base-content/70">
                Access your notes anywhere, anytime with cloud synchronization
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/signup" className="btn btn-primary btn-lg px-8">
            Get Started
          </Link>
          <Link to="/signin" className="btn btn-outline btn-lg px-8">
            Sign In
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-base-content/60">
            Join thousands of users who trust NoteKeeper with their ideas
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartingPage;