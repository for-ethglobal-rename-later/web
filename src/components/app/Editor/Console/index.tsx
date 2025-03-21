import { useEditor } from '../index';
import { motion } from 'motion/react';

import Button from '@/components/UI/Button';

import IconChevrondown from '@/../public/icons/chevrondown.svg';
import IconConsole from '@/../public/icons/console.svg';

const Index = () => {
  const { isConsoleOpen, toggleConsole, consoleMessages } = useEditor();

  return (
    <motion.div
      initial={{ translateY: 0 }}
      animate={{
        translateY: isConsoleOpen ? 0 : 220,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={'absolute bottom-0 h-[280px] w-full bg-neutral-700'}
    >
      <div className={'flex h-[50px] w-full items-center justify-between bg-neutral-700 px-5 pt-2.5'}>
        <div className={'flex items-center gap-3 [&>svg]:text-blue-900'}>
          <IconConsole />
          <p>Console</p>
        </div>
        <Button variant={'plain'} onClick={toggleConsole} size={'Icon'}>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{
              rotate: isConsoleOpen ? 0 : 180,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <IconChevrondown />
          </motion.div>
        </Button>
      </div>
      <div className={'h-full w-full overflow-y-scroll px-5 pt-5 font-mono text-neutral-200'}>
        <div className={'absolute top-[48px] left-0 h-5.5 w-full bg-gradient-to-b from-neutral-700 to-neutral-700/0'} />
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: isConsoleOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {consoleMessages}
        </motion.div>
        <div className={'h-32'} />
      </div>
    </motion.div>
  );
};

export default Index;
