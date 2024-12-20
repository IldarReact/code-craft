import { useEffect } from 'react'
import { makeServer } from './mocks/server'
import { EditorSection } from './components/Editor'
import { ExecutionOutput } from './components/Results'
import { useEditor } from './hooks/useEditor'
import { useExecution } from './hooks/useExecution'
import { useTaskStore } from './store/slices/taskStore'
import { SUPPORTED_LANGUAGES } from './constants/languages'
import { TaskList } from './components/TaskList/TaskList'
import { AppHeader, Container } from './components/Layout'
import './index.css'

let server: ReturnType<typeof makeServer> | null = null

const App = () => {
  const { code, language, onCodeChange, onLanguageChange } = useEditor()
  const { execute, reset, isRunning } = useExecution()
  const { currentTask } = useTaskStore()

  useEffect(() => {
    if (!server) {
      server = makeServer()
    }
    return () => {
      server?.shutdown()
      server = null
    }
  }, [])

  useEffect(() => {
    if (currentTask) {
      onCodeChange(currentTask.initialCode || '')
      onLanguageChange(currentTask.language || 'javascript')
    }
  }, [currentTask, onCodeChange, onLanguageChange])

  const handleExecute = () => {
    execute({ code, language })
  }

  return (
    <Container>
      <AppHeader />

      <main className="space-y-6">
        <TaskList />

        <div className="bg-gray-50 p-4 rounded-md shadow-md">
          <EditorSection
            code={code}
            language={language}
            isRunning={isRunning}
            onCodeChange={onCodeChange}
            onLanguageChange={onLanguageChange}
            onExecute={handleExecute}
            supportedLanguages={SUPPORTED_LANGUAGES}
          />

          <ExecutionOutput onReset={reset} />
        </div>
      </main>
    </Container>
  )
}

export default App
