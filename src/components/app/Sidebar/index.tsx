'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import IconSidebar from '@/../public/icons/sidebar.svg';

import Pages from './Pages';
import Creations from './Creations';
import Profile from './Profile';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <motion.aside
        initial={{ width: 288 }}
        animate={{
          width: isOpen ? 288 : 16,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className='relative flex h-screen flex-none flex-col overflow-hidden'
      >
        <div className={'absolute z-[99] h-screen w-[288px] bg-neutral-800'}>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: isOpen ? 1 : 0,
            }}
            className={'flex h-screen w-full flex-col'}
          >
            <div
              className={
                'flex w-full items-center justify-between gap-3 px-5 pt-[22px] pb-8'
              }
            >
              <div className={'flex items-center gap-2 select-none'}>
                <Image src={'/logo.svg'} alt={'logo'} width={32} height={32} />
                <p className={'text-[28px]'}>Klados</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={
                  'flex h-10 w-10 cursor-pointer items-center justify-center rounded-[8px] text-neutral-300 transition hover:bg-neutral-700'
                }
              >
                <IconSidebar />
              </button>
            </div>
            <Pages />
            <Creations />
            <Profile />
          </motion.div>
        </div>
      </motion.aside>
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className='fixed top-[22px] left-[22px] z-50 flex h-full cursor-pointer flex-col overflow-hidden p-2 text-neutral-300'
        >
          <IconSidebar />
        </button>
      )}
    </>
  );
};

export default Sidebar;
