'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconDots from '@/../public/icons/dots.svg';
import IconPencil from '@/../public/icons/pencil.svg';
import IconTrash from '@/../public/icons/trash.svg';

const creations = [
  { id: '1', title: 'my first little creation' },
  { id: '2', title: 'another cool project' },
  { id: '3', title: 'awesome AI experiment' },
];

const Creations = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const toggleMenu = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    setActiveMenu(activeMenu === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative flex h-full w-full flex-col'>
      <div className='mt-8 flex h-full w-full flex-col gap-0.5 overflow-scroll px-1.5'>
        <div className='w-full px-4 py-2 text-[14px] leading-[20px] font-medium text-neutral-300'>
          <p>Creations</p>
        </div>
        {creations.map((creation) => {
          const isActive = pathname === `/app/c/${creation.id}`;

          return (
            <div key={creation.id} className='relative'>
              <Link
                href={`/app/c/${creation.id}`}
                className={`group flex w-full items-center gap-3 rounded-[8px] px-4 py-2 text-[14px] leading-[20px] transition-colors ${
                  isActive
                    ? 'bg-neutral-600 text-black'
                    : activeMenu === creation.id
                      ? 'bg-neutral-700'
                      : 'hover:bg-neutral-700'
                }`}
              >
                <p className='line-clamp-1 w-full overflow-hidden overflow-ellipsis first-letter:uppercase'>
                  {creation.title}
                </p>
                <button
                  onClick={(event) => toggleMenu(creation.id, event)}
                  className='aspect-square w-4 flex-none cursor-pointer opacity-0 transition-transform group-hover:opacity-100 active:scale-95'
                >
                  <IconDots />
                </button>
              </Link>
              {activeMenu === creation.id && (
                <div
                  ref={menuRef}
                  className='absolute top-8 right-0 z-10 flex w-40 flex-col gap-1 rounded-[16px] border-1 border-neutral-500 bg-neutral-700 p-2 shadow-lg'
                >
                  <button className='flex w-full cursor-pointer items-center gap-3 rounded-[8px] px-4 py-2 hover:bg-neutral-600'>
                    <IconPencil className={'text-neutral-300'} />
                    <p>Edit</p>
                  </button>
                  <button className='flex w-full cursor-pointer items-center gap-3 rounded-[8px] px-4 py-2 hover:bg-neutral-600'>
                    <IconTrash className={'text-neutral-300'} />
                    <p>Delete</p>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Creations;
