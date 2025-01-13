import React from 'react';
import { Terminal } from 'lucide-react';

interface CommandListProps {
  commands: string[];
  onSelectCommand: (command: string) => void;
}

export function CommandList({ commands, onSelectCommand }: CommandListProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-48 bg-gray-900 rounded-lg p-4 shadow-lg">
      <div className="flex items-center space-x-2 mb-2">
        <Terminal className="w-4 h-4" />
        <span className="text-sm font-bold">Quick Commands</span>
      </div>
      <div className="space-y-1">
        {commands.filter(cmd => cmd !== 'clear').map((command) => (
          <button
            key={command}
            onClick={() => onSelectCommand(command)}
            className="w-full text-left px-2 py-1 rounded hover:bg-gray-800 text-sm transition-colors"
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}