'use client';

import { useState, useRef, useEffect } from 'react';

import IconWallet from '@/../public/icons/wallet.svg';
import IconExit from '@/../public/icons/exit.svg';
import IconGear from '@/../public/icons/gear.svg';
import IconPerson from '@/../public/icons/person.svg';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='mt-auto flex w-full flex-none p-1.5 pb-8'>
      <div className={'relative w-full'}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full cursor-pointer items-center gap-3 rounded-[8px] px-4 py-2 ${
            isOpen ? 'bg-neutral-700' : 'hover:bg-neutral-700'
          }`}
        >
          <div className='flex aspect-square h-8 items-center justify-center rounded-full border border-neutral-600'>
            <IconWallet />
          </div>
          <p className='w-28 overflow-hidden overflow-ellipsis'>
            0xc949B67A3beF8941195792c0cA46533F6B52D6B5
          </p>
        </button>

        {isOpen && (
          <div
            ref={menuRef}
            className='absolute bottom-[54px] left-0 flex w-full flex-col gap-2 rounded-[16px] border-1 border-neutral-600 bg-neutral-700 p-2'
          >
            <button
              className={
                'flex w-full cursor-pointer items-center gap-3 rounded-[8px] px-3 py-2 text-[14px] leading-[20px] font-medium hover:bg-neutral-600'
              }
            >
              <IconPerson className={'text-neutral-300'} />
              Profile
            </button>
            <button
              className={
                'flex w-full cursor-pointer items-center gap-3 rounded-[8px] px-3 py-2 text-[14px] leading-[20px] font-medium hover:bg-neutral-600'
              }
            >
              <IconGear className={'text-neutral-300'} />
              Settings
            </button>
            <div className={'h-0.25 w-full bg-neutral-600'}> </div>
            <button
              className={
                'flex w-full cursor-pointer items-center gap-3 rounded-[8px] px-3 py-2 text-[14px] leading-[20px] font-medium hover:bg-neutral-600'
              }
            >
              <IconExit className={'text-neutral-300'} />
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
