import Sidebar from '@/components/app/Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'flex h-screen items-start'}>
      <Sidebar />
      <div className={'h-full w-full p-4 pl-0'}>
        <div
          className={
            'flex h-full w-full flex-col items-center justify-center overflow-scroll rounded-[12px] border border-neutral-100/10 bg-neutral-700'
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
