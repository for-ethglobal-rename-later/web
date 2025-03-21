'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconParticles from '@/../public/icons/particles.svg';
import IconCompas from '@/../public/icons/compass.svg';
import IconBook from '@/../public/icons/book.svg';

const links = [
  { href: '/app', icon: IconParticles, label: 'Create' },
  { href: '/app/explore', icon: IconCompas, label: 'Explore' },
  { href: '/app/docs', icon: IconBook, label: 'Docs' },
];

const Pages = () => {
  const pathname = usePathname();

  return (
    <div className='flex flex-col gap-1.5 px-1.5'>
      {links.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-2 [&>svg]:text-[24px] ${isActive ? 'text-neutral-100!' : 'text-neutral-300 hover:text-neutral-200'}`}>
            <Icon />
            <p className='text-[18px] leading-[24px] font-medium'>{label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Pages;
