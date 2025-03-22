import Header from './Header';
import Editor from './Editor';

const Index = ({ id }: { id: string }) => {
  return (
    <div className={'relative h-full w-full flex-col'}>
      <Header />
      <Editor />
    </div>
  );
};

export default Index;
