import Header from './Header';
import Editor from './Editor';

const Index = ({ id }: { id: string }) => {
  return (
    <div className={'relative h-full w-full flex-col'}>
      <Header />
      <div className={'relative h-full w-full overflow-auto'}>
        <Editor />
      </div>
    </div>
  );
};

export default Index;
