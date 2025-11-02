// Import React's tools and your data
import { useState, useEffect, useRef } from 'react';
import './index.css'; // Your styles from Step 2
import resumeData from './resumeData.json'; // Your data from Step 1

function App() {
  // 1. "history" stores all the old commands and results
  const [history, setHistory] = useState([
    { text: "Welcome to my portfolio. Type 'help' for commands.", type: "system" }
  ]);
  // 2. "command" is the *current* command the user is typing
  const [command, setCommand] = useState('');

  // This is a "ref" to always scroll to the bottom
  const terminalBottomRef = useRef(null);

  // This "effect" runs every time the 'history' changes
  useEffect(() => {
    // Scroll to the bottom
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // This is the "brain" - it runs when the user hits "Enter"
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      let result = ''; // This will be the answer
      const lowerCommand = command.toLowerCase(); // Make command case-insensitive

      // --- THIS IS THE "BRAIN" LOGIC ---
      if (lowerCommand === 'whoami') {
        result = resumeData.summary;
      } else if (lowerCommand === 'contact') {
        result = `Email: ${resumeData.contact.email}\nLinkedIn: ${resumeData.contact.linkedin}\nGitHub: ${resumeData.contact.github}`;
      } else if (lowerCommand === 'help') {
        result = 'Available commands:\n  whoami  - About me\n  contact - Display contact information\n  skills  - List my technical skills\n  projects- List my projects\n  clear   - Clear the terminal';
      } else if (lowerCommand === 'skills') {
        result = `Languages: ${resumeData.skills.Languages}\nData: ${resumeData.skills.Data}\nTools: ${resumeData.skills.Tools}`;
      } else if (lowerCommand === 'projects') {
        result = `Expense Agent: ${resumeData.projects['expense-agent']}\nData Viz: ${resumeData.projects['data-viz']}`;
      } else if (lowerCommand === 'clear') {
        setHistory([]); // Special case: clear the history
        setCommand(''); // Clear the input
        return;
      } else {
        result = `command not found: ${command}. Type 'help' to see commands.`;
      }
      // --- END OF "BRAIN" LOGIC ---

      // Add the command and its result to the history
      setHistory([
        ...history,
        { text: `[kalash@portfolio] ~ $ ${command}`, type: "command-echo" },
        { text: result, type: "output" }
      ]);
      // Clear the input box for the next command
      setCommand('');
    }
  };

  // This is the "HTML" part that shows on the page
  return (
    <div className="terminal">
      {/* This loops over the history and displays it */}
      {history.map((entry, index) => (
        <div key={index} className={entry.type}>
          {entry.text}
        </div>
      ))}

      {/* This is the live input line */}
      <div className="input-line">
        <span className="prompt">[kalash@portfolio] ~ $</span>
        <input
          type="text"
          className="terminal-input"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleEnter}
          autoFocus // Automatically clicks the input for you
        />
      </div>

      {/* This empty div is our "anchor" to scroll to */}
      <div ref={terminalBottomRef} />
    </div>
  );
}

export default App;