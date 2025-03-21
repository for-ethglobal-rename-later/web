import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
}

const ChatMessages = ({ messages, loading }: ChatMessagesProps) => {
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
        <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`mb-1.5 rounded-[6px] px-4 py-3 text-[16px] leading-[24px] text-neutral-100 first:mt-auto ${msg.sender === 'ai' ? 'mr-auto' : 'ml-auto bg-neutral-600'}`}>
          <p className='w-full overflow-hidden overflow-ellipsis'>{msg.text}</p>
        </motion.div>
      ))}

      {loading && <motion.div className={'mb-1.5 animate-pulse rounded-[6px] px-4 py-3 text-[16px] leading-[24px] text-neutral-100'}>Thinking...</motion.div>}
    </div>
  );
};

export default ChatMessages;
