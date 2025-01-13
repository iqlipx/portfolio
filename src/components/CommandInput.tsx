import React, { useState, KeyboardEvent } from 'react';
import { User } from 'lucide-react';

interface CommandInputProps {
  onCommand: (command: string) => void;
}

export function CommandInput({ onCommand }: CommandInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        <User className="w-4 h-4" />
        <span>www-data@iqlip:~$</span>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0"
        autoFocus
      />
    </div>
  );
}