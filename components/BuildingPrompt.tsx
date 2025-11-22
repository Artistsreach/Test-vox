
import React, { useState } from 'react';

interface BuildingPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const BuildingPrompt: React.FC<BuildingPromptProps> = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'bg-black/60' : 'bg-transparent pointer-events-none'}`}
      onClick={onClose}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="building-prompt-title"
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800/95 rounded-2xl shadow-lg w-[90vw] max-w-lg flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-700 text-center relative flex-shrink-0">
          <h2 id="building-prompt-title" className="text-xl font-bold text-white">What do you want to build?</h2>
          <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white text-3xl leading-none" aria-label="Close building prompt">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex-grow flex flex-col gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a small wooden cabin with a red roof"
            className="w-full h-28 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            aria-label="Building description"
            disabled={isLoading}
          />
          {isLoading ? (
            <div className="flex items-center justify-center p-3 text-white">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Building in progress...
            </div>
          ) : (
            <div className="flex justify-end gap-3 flex-shrink-0">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition-colors">Cancel</button>
              <button type="submit" disabled={!prompt.trim()} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Build</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BuildingPrompt;
