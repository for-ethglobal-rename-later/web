import { useState } from 'react';
import { useEditor } from '../index';
import { motion } from 'motion/react';

import IconChat from '@/../public/icons/chat.svg';
import IconXmark from '@/../public/icons/xmark.svg';

import Button from '@/components/UI/Button';

import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const AiChat = () => {
  const { isChatOpen, toggleChat } = useEditor();
  const [messages, setMessages] = useState<Message[]>([{ id: '1', text: 'Hello world!', sender: 'ai' }]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'ai',
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div initial={{ width: '33%' }} animate={{ width: isChatOpen ? '33%' : '0' }} transition={{ duration: 0.2, ease: 'easeOut' }} className='flex-none' />
      <motion.div initial={{ translateX: 0 }} animate={{ translateX: isChatOpen ? 0 : '100%' }} transition={{ duration: 0.2, ease: 'easeOut' }} className='absolute right-0 h-full w-[33%] justify-between'>
        <div className='relative flex h-full w-full flex-col border-l border-neutral-600'>
          <div className='flex w-full items-center justify-between gap-4 px-5 pt-2.5'>
            <div className='flex items-center gap-3 [&>svg]:text-blue-900'>
              <IconChat />
              <p>AI Chat</p>
            </div>
            <Button onClick={toggleChat} size='Icon' variant='plain'>
              <IconXmark />
            </Button>
          </div>
          <div className='flex h-[calc(100%-50px)] w-full flex-col'>
            <ChatMessages loading={isLoading} messages={messages} />
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AiChat;
