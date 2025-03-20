import { useEditor } from '../index';

const Index = () => {
  const { isConsoleOpen, toggleConsole } = useEditor();

  return (
    <div>
      {isConsoleOpen && <p>console open</p>} <button onClick={toggleConsole}>toggle</button>
    </div>
  );
};

export default Index;
