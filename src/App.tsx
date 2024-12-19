import { useEffect } from 'react'
import { makeServer } from './mocks/server'
import { CodeEditor, LanguageSelector } from './components/Editor'
import useEditorStore from './store/editorStore'
import './styles/index.css'
import { Button } from './components/ui'
import { ExecutionOutput } from './components/Results'
import { useExecutionStore } from './store/executionStore';

const languages = {
  javascript: 'JavaScript',
  python: 'Python',
}

let server: ReturnType<typeof makeServer> | null = null

const App: React.FC = () => {
  const { language, setLanguage, code, setCode } = useEditorStore()
  const { executeCode, reset } = useExecutionStore();


  useEffect(() => {
    if (!server) {
      server = makeServer()
    }

    return () => {
      server?.shutdown()
      server = null
    }
  }, [])

  const handleExecuteCode = async () => {
    await executeCode({ 
      code,
      language 
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Code Craft</h1>

      <div className="mb-4 flex space-x-4">
        <LanguageSelector
          value={language}
          onChange={setLanguage}
          languages={languages}
        />
        <Button color="primary" onClick={handleExecuteCode}>
          Run
        </Button>
      </div>

      <CodeEditor value={code} onChange={setCode} />
      <ExecutionOutput onReset={reset} />
    </div>
  )
}

export default App
