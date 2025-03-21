'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

import CodeEditor from './CodeEditor';
import Console from './Console';
import AIChat from './AIChat';

interface EditorContextType {
  isConsoleOpen: boolean;
  isChatOpen: boolean;
  consoleMessages: string[];
  toggleConsole: () => void;
  toggleChat: () => void;
  setConsoleMessages: (messages: string[]) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [consoleMessages, setConsoleMessages] = useState<string[]>(['Hello World']);

  const toggleConsole = () => setIsConsoleOpen((prev) => !prev);
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  return (
    <EditorContext.Provider
      value={{
        isConsoleOpen,
        isChatOpen,
        consoleMessages,
        toggleConsole,
        toggleChat,
        setConsoleMessages,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

const Editor = ({ id }: { id: string }) => {
  return (
    <EditorProvider>
      <div className='relative flex h-full w-full overflow-hidden'>
        <div className='relative flex h-full w-full flex-col'>
          <CodeEditor id={id} />
          <Console />
        </div>
        <AIChat />
      </div>
    </EditorProvider>
  );
};

export { useEditor };
export default Editor;
