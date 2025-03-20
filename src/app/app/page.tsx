'use client';

import { useState } from 'react';
import AnimatedBackground from '@/components/app/AnimatedBackground';
import Button from '@/components/UI/Button';

import IconArrowRight from '@/../public/icons/arrow-right.svg';
import IconImport from '@/../public/icons/import.svg';

const Page = () => {
  const [title, setTitle] = useState<string>('');

  return (
    <div
      className={
        'relative flex h-full w-full items-center justify-center overflow-hidden'
      }
    >
      <div
        className={
          'z-[20] flex h-full w-full flex-col items-center justify-center gap-6 p-8'
        }
      >
        <p className={'text-center text-[36px] leading-[48px]'}>
          What do you want to create?
        </p>
        <div
          className={
            'flex w-full max-w-[720px] flex-col gap-3 rounded-[24px] border-1 border-neutral-100/10 bg-neutral-600/40 p-3 backdrop-blur-[64px]'
          }
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder={'Project Name...'}
            className={
              'w-full p-3 text-[24px] leading-[32px] font-medium outline-none placeholder:text-neutral-300'
            }
          />

          <div
            className={'flex w-full items-center justify-between gap-4 pl-3'}
          >
            <p>Klados v0.1</p>
            <div className={'flex items-center gap-2'}>
              <Button variant={'secondary'}>
                <IconImport /> Import
              </Button>
              <Button disabled={title.length < 3}>
                Create Project
                <IconArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AnimatedBackground />
    </div>
  );
};

export default Page;
