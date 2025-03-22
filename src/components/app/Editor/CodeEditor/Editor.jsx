'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import './style.css';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

const handleEditorDidMount = (editor, monaco) => {
  monaco.editor.defineTheme('my-theme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { background: '1D1E1F' },
      { token: 'keyword', foreground: '#4AC569', fontStyle: 'bold' },
      { token: 'number', foreground: '#64D2FF' },
      { token: 'string', foreground: '#BE78E1' },
      { token: 'variable', foreground: '#F9B955' },
      { token: 'type', foreground: '#F64032' },
      { token: 'comment', foreground: '#64686B', fontStyle: 'italic' },
    ],
    colors: {
      'editor.foreground': '#B2B5B8',
      'editor.background': '#1D1E1F',
      'scrollbar.shadow': '#1D1E1F',
    },
  });
  monaco.editor.setTheme('my-theme');
};

const editorOptions = {
  minimap: {
    enabled: false,
  },
  contextmenu: false,
  stickyScroll: {
    enabled: false,
  },
  padding: { top: 20 },
};

const Editor = () => {
  const [code, setCode] = useState('// Write your code here...');
  return (
    <div className={'h-full w-full'}>
      <MonacoEditor options={editorOptions} defaultLanguage='javascript' onMount={handleEditorDidMount} defaultValue={code} onChange={(value) => setCode(value || '')} />
    </div>
  );
};

export default Editor;
