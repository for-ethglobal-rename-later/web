import Header from './Header';

const Index = ({ id }: { id: string }) => {
  return (
    <div className={'relative h-full w-full flex-col overflow-y-scroll pb-[320px]'}>
      <Header />
      <div className={'h-[4000px] w-32 bg-neutral-300'}></div>
    </div>
  );
};

export default Index;
