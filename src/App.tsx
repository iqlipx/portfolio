import React, { useState, useRef, useEffect } from "react";
import {
  Terminal,
  User,
  Github,
  Linkedin,
  Mail,
  FileText,
  Instagram,
  MessageSquare,
} from "lucide-react";
import { CommandInput } from "./components/CommandInput";
import { CommandOutput } from "./components/CommandOutput";

function App() {
  const [history, setHistory] = useState<
    Array<{ command: string; output: JSX.Element | string }>
  >([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands = {
    ls: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <span className="text-blue-400">about.txt</span>
        <span className="text-blue-400">projects.txt</span>
        <span className="text-blue-400">contact.txt</span>
        <span className="text-blue-400">community-resources.txt</span>
        <span className="text-blue-400">discord.txt</span>
      </div>
    ),
    "cat about.txt": (
      <div className="space-y-2">
        <p>
          Hey there! 👋 I'm Shubham aka Iqlip, a passionate cybersecurity enthusiast with a
          focus on offensive security, red teaming, and OSINT.
        </p>
        <p>
          I'm good at OSINT, creating security tools, and exploring penetration
          testing. I've also created some tools to enhance security practices.
        </p>
        <p>
          When I'm not working on cybersecurity projects, I enjoy diving deeper
          into OSINT, constantly learning new skills, and exploring new areas of
          cybersecurity.
        </p>
      </div>
    ),
    "cat projects.txt": (
      <div className="space-y-4">
        <div>
          <h3 className="text-green-400">📧 MailSavvy</h3>
          <p>
            A Flask-based tool for real-time email verification using DNS and
            SMTP checks.
          </p>
          <a
            href="https://github.com/iqlipx/MailSavvy"
            className="text-blue-400 hover:underline"
          >
            https://github.com/iqlipx/MailSavvy
          </a>
        </div>
        <div>
          <h3 className="text-green-400">🧅 Onion_Endpoints_Fetcher</h3>
          <p>
            A Flask-based web app to fetch and display endpoints from onion
            sites on the TOR network.
          </p>
          <a
            href="https://github.com/iqlipx/Onion_Endpoints_Fetcher"
            className="text-blue-400 hover:underline"
          >
            https://github.com/iqlipx/Onion_Endpoints_Fetcher
          </a>
        </div>
      </div>
    ),
    "cat contact.txt": (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Github className="w-4 h-4" />
          <a
            href="https://github.com/iqlipx"
            className="text-blue-400 hover:underline"
          >
            github.com/iqlipx
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Linkedin className="w-4 h-4" />
          <a
            href="https://www.linkedin.com/in/iqlip/"
            className="text-blue-400 hover:underline"
          >
            linkedin.com/in/iqlip
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Instagram className="w-4 h-4" />
          <a
            href="https://www.instagram.com/iqlip7"
            className="text-blue-400 hover:underline"
          >
            instagram.com/iqlip7
          </a>
        </div>
      </div>
    ),
    "cat discord.txt": (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-[#5865F2]" />
          <h3 className="text-[#5865F2] font-bold">
            Join our Discord Community
          </h3>
        </div>
        <a
          href="https://discord.gg/qc43TxvWHC"
          className="text-blue-400 hover:underline block"
        >
          Click here to join: discord.gg/CrimsonCommandCenter
        </a>
        <p className="mt-4">
          Join a vibrant community of cybersecurity enthusiasts! Whether you're
          passionate about red teaming, blue teaming, or simply eager to expand
          your knowledge, this is your space to learn, connect, and grow.
        </p>
      </div>
    ),
    "cat community-resources.txt": (
      <div className="space-y-2">
        <div>
          <h3 className="text-green-400">📚 Learning Resources</h3>
          <ul className="list-disc list-inside">
            <li>
              <a
                href="https://ohshint.gitbook.io/"
                className="text-blue-400 hover:underline"
              >
                OH SHINT
              </a>
            </li>
            <li>
              <a
                href="https://www.operationprivacy.com/"
                className="text-blue-400 hover:underline"
              >
                Operation Privacy
              </a>
            </li>
            <li>
              <a
                href="https://hacknexus.io/tools"
                className="text-blue-400 hover:underline"
              >
                HackNexus Tools
              </a>
            </li>
          </ul>
        </div>
      </div>
    ),
    whoami: "Iqlip",
    help: (
      <div className="space-y-2">
        <p>Available commands:</p>
        <ul className="list-disc list-inside">
          <li>ls - List directory contents</li>
          <li>cat about.txt - Learn about me</li>
          <li>cat projects.txt - View my projects</li>
          <li>cat contact.txt - Get my contact info</li>
          <li>cat discord.txt - Join our Discord community</li>
          <li>cat community-resources.txt - Useful resources</li>
          <li>whoami - Display current user</li>
          <li>clear - Clear the terminal</li>
          <li>help - Show this help message</li>
        </ul>
      </div>
    ),
  };

  useEffect(() => {
    setHistory([
      {
        command: "",
        output: (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6 text-green-400" />
              <h1 className="text-xl font-bold">Welcome to Iqlip Terminal</h1>
            </div>
            <p>Type 'help' to see available commands.</p>
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (command: string) => {
    const normalizedCommand = command.trim().toLowerCase();

    if (normalizedCommand === "clear") {
      setHistory([]);
      return;
    }

    const output =
      commands[normalizedCommand as keyof typeof commands] ||
      `Command not found: ${command}`;

    setHistory((prev) => [...prev, { command, output }]);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        {/* Terminal Title Bar */}
        <div className="bg-gray-700 p-3 flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-sm text-gray-300">
            Terminal
          </div>
        </div>

        {/* Terminal Content */}
        <div className="bg-black p-4 h-[600px] overflow-y-auto hide-scrollbar">
          <div className="space-y-4">
            <div className="space-y-2">
              {history.map((entry, index) => (
                <CommandOutput
                  key={index}
                  command={entry.command}
                  output={entry.output}
                />
              ))}
            </div>
            <CommandInput onCommand={handleCommand} />
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
