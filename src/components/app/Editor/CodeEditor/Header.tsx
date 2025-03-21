import { useEditor } from '@/components/app/Editor';

import Button from '@/components/UI/Button';
import { motion } from 'motion/react';

import IconPlay from '@/../public/icons/play.svg';
import IconSave from '@/../public/icons/save.svg';
import IconExport from '@/../public/icons/export.svg';
import IconChat from '@/../public/icons/chat.svg';
import IconDots from '@/../public/icons/dots.svg';

import useSidebarStore from '@/store/sidebarStore';

const Header = () => {
  const { isOpen } = useSidebarStore();
  const { isChatOpen, toggleChat } = useEditor();

  return (
    <div className={'sticky top-0 flex items-center gap-4 bg-neutral-700 pt-2.5 pr-2.5 pb-[1px] pl-5'}>
      <motion.div
        initial={{ marginLeft: 0 }}
        animate={{
          marginLeft: isOpen ? 0 : 44,
        }}
        className={'flex items-center gap-3 transition'}
      >
        <p className={'max-w-52 overflow-hidden text-[14px] leading-[20px] overflow-ellipsis'}>Here Comes The Title</p>
        <IconDots className={'cursor-pointer text-neutral-300'} />
      </motion.div>
      <div className={'absolute top-[51px] left-0 h-5 w-full bg-gradient-to-b from-neutral-700 to-neutral-700/0'}></div>
      <div className={'ml-auto flex items-center gap-3'}>
        {!isChatOpen && (
          <Button onClick={toggleChat} size={'Icon'} variant={'secondary'}>
            <IconChat />
          </Button>
        )}
        <Button variant={'secondary'}>
          <IconExport />
          <p>Export</p>
        </Button>
        <Button size={'Icon'} variant={'secondary'}>
          <IconSave />
        </Button>
        <Button size={'Icon'}>
          <IconPlay />
        </Button>
      </div>
    </div>
  );
};

export default Header;
