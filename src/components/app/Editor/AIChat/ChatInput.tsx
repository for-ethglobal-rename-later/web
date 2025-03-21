import { useState } from 'react';
import Button from '@/components/UI/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-none items-center justify-between gap-2 bg-neutral-800 p-3'>
      <input type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder='Mesajınızı yazın...' className='w-full flex-1 rounded bg-neutral-700 px-3 py-2 text-white' disabled={isLoading} />
      <Button type='submit' disabled={isLoading || !inputText.trim()} className='rounded bg-blue-500 px-4 py-2 text-white disabled:bg-blue-800 disabled:opacity-50'>
        {isLoading ? 'Gönderiliyor...' : 'Gönder'}
      </Button>
    </form>
  );
};

export default ChatInput;
