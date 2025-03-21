import { useState } from 'react';

import IconPaperclip from '@/../public/icons/paperclip.svg';
import IconEnter from '@/../public/icons/enter.svg';

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
    <form onSubmit={handleSubmit} className='flex h-fit w-full flex-none p-1.5'>
      <div className={'box-border flex w-full flex-col gap-4 rounded-[6px] border border-neutral-100/10 bg-gradient-to-br from-yellow-900/10 via-purple-900/10 to-blue-900/10 px-4 py-3 outline outline-neutral-800'}>
        <input placeholder={'Ask anything...'} type={'text'} className={'w-full outline-none'} value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <div className={'flex w-full items-center justify-between text-neutral-300'}>
          <IconPaperclip />
          <button type={'submit'} className={'flex cursor-pointer items-center gap-1.5 font-medium transition ease-out hover:text-neutral-100 disabled:text-neutral-300! disabled:opacity-50!'} disabled={isLoading || inputText.trim().length < 3}>
            <IconEnter />
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
