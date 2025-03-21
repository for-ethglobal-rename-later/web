import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (isUserAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setIsUserAtBottom(scrollHeight - scrollTop <= clientHeight + 10);
  };

  return (
    <div ref={chatRef} onScroll={handleScroll} className='flex h-full w-full flex-col overflow-y-scroll p-1.5'>
      {messages.map((msg) => (
        <div key={msg.id} className={`mb-2 flex w-full items-center rounded p-3 text-white first:mt-auto ${msg.sender === 'ai' ? 'bg-blue-900' : 'ml-auto bg-green-900'}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
