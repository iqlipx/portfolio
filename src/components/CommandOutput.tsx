import React from 'react';
import { User } from 'lucide-react';

interface CommandOutputProps {
  command: string;
  output: JSX.Element | string;
}

export function CommandOutput({ command, output }: CommandOutputProps) {
  if (!command && typeof output !== 'string') {
    return <div className="animate-fade-in">{output}</div>;
  }

  return (
    <div className="space-y-1 animate-fade-in">
      {command && (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>www-data@iqlip:~$ {command}</span>
        </div>
      )}
      <div className="ml-6">{output}</div>
    </div>
  );
}