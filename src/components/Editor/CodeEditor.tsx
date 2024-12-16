import React from 'react'
import { Editor } from '@monaco-editor/react'
import useEditorStore from '../../store/editorStore'

const CodeEditor: React.FC = () => {
  const { code, language, setCode } = useEditorStore()

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '')
  }

  return (
    <Editor
      height="400px"
      language={language}
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14
      }}
    />
  )
}

export default CodeEditor