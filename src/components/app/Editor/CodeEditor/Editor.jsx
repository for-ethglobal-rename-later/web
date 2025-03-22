'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

const initialCode = `@init("AI-powered research assistant that evolves over time")
entity Intellect {
    @desc("Stores processed research queries and results")
    evolvable struct ResearchMemory {
        string query;
        string[] sources;
        string synthesis;
        uint256 timestamp;
        float usefulness;
    }
    struct ResearchRequest {
        string query;
        string[] sources;
    }
    @requires("user needs {{calculation}} eth")
    @think("Processes a user research request")
    func onResearchQuery(ResearchRequest) -> ResearchMemory;
    @think("Initializes system at startup")
    evolvable func onStartup() -> ResearchMemory;
}`;

const handleEditorDidMount = (editor, monaco) => {
  monaco.languages.register({ id: 'intellect-schema' });

  monaco.languages.setMonarchTokensProvider('intellect-schema', {
    defaultToken: 'invalid',
    keywords: ['entity', 'struct', 'func', 'evolvable', 'string', 'uint256', 'float'],
    annotations: ['@init', '@desc', '@requires', '@think'],
    operators: ['->', '{', '}', '[', ']', '(', ')', ';', ','],
    tokenizer: {
      root: [
        [/@[a-zA-Z]\w*/, 'annotation'],
        [/\b(entity|struct|func|evolvable)\b/, 'keyword'],
        [/\b(string|uint256|float)\b/, 'type'],
        [/[a-zA-Z_]\w*/, 'variable'],
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
        [/[ \t\r\n]+/, 'white'],
        [/\/\/.*$/, 'comment'],
        [/[{}()\[\]]/, '@brackets'],
        [/[;,]/, 'delimiter'],
        [/->/, 'operator'],
      ],
      string: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],
    },
  });

  monaco.languages.registerCompletionItemProvider('intellect-schema', {
    provideCompletionItems: function (model, position) {
      const suggestions = [
        {
          label: 'entity',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'entity ${1:name} {\n\t$0\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Define a new entity',
        },
        {
          label: 'struct',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'struct ${1:name} {\n\t$0\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Define a new struct',
        },
        {
          label: 'evolvable',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'evolvable ',
          documentation: 'Mark a struct or function as evolvable',
        },
        {
          label: 'func',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'func ${1:name}(${2:params}) -> ${3:returnType}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Define a new function',
        },
        {
          label: '@init',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '@init("${1:description}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Initialize annotation',
        },
        {
          label: '@desc',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '@desc("${1:description}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Description annotation',
        },
        {
          label: '@requires',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '@requires("${1:requirement}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Requirement annotation',
        },
        {
          label: '@think',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '@think("${1:thinking process}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Thinking process annotation',
        },
      ];
      return { suggestions: suggestions };
    },
  });

  monaco.languages.setLanguageConfiguration('intellect-schema', {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
    ],
    indentationRules: {
      increaseIndentPattern: /{(?!.*}).*$/,
      decreaseIndentPattern: /^(.*})?$/,
    },
  });

  monaco.editor.defineTheme('Klados', {
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
      { token: 'annotation', foreground: '#64D2FF', fontStyle: 'italic' },
      { token: 'operator', foreground: '#B2B5B8' },
      { token: 'delimiter', foreground: '#B2B5B8' },
    ],
    colors: {
      'editor.foreground': '#B2B5B8',
      'editor.background': '#1D1E1F',
      'scrollbar.shadow': '#1D1E1F',
    },
  });

  monaco.editor.setTheme('Klados');
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
  const [code, setCode] = useState(initialCode);

  return <MonacoEditor className={'absolute top-0 left-0 h-full w-full'} options={editorOptions} language='intellect-schema' onMount={handleEditorDidMount} value={code} onChange={(value) => setCode(value || '')} />;
};

export default Editor;
