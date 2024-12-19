import React from 'react'
import MonacoEditor from '@monaco-editor/react'
import useEditorStore from '../../store/editorStore'

const CodeEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const { language } = useEditorStore();

  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    theme: 'vs-dark',
    automaticLayout: true,
  };

  return (
    <div className="rounded-lg overflow-hidden border p-3 bg-[#1E1E1E]">
      <MonacoEditor
        height="400px"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={handleChange}
        options={editorOptions}
      />
    </div>
  );
};

export default CodeEditor
