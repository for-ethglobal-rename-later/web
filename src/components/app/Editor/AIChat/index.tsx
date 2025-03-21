import { useEditor } from '../index';
import { motion } from 'motion/react';

import IconChat from '@/../public/icons/chat.svg';
import IconXmark from '@/../public/icons/xmark.svg';

import Button from '@/components/UI/Button';

const Index = () => {
  const { isChatOpen, toggleChat } = useEditor();

  return (
    <>
      <motion.div
        initial={{ width: '33%' }}
        animate={{
          width: isChatOpen ? '33%' : '0',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className='flex-none'
      />
      <motion.div
        initial={{ translateX: 0 }}
        animate={{
          translateX: isChatOpen ? 0 : '100%',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className='absolute right-0 h-full w-[33%] justify-between'
      >
        <div className={'relative h-full w-full border-l border-neutral-600'}>
          <div className={'flex w-full items-center justify-between gap-4 px-5 pt-2.5'}>
            <div className={'flex items-center gap-3 [&>svg]:text-blue-900'}>
              <IconChat />
              <p>AI Chat</p>
            </div>
            <Button onClick={toggleChat} size={'Icon'} variant={'plain'}>
              <IconXmark />
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Index;
