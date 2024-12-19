import React from 'react'
import { CodeEditor, LanguageSelector } from './index'
import { LanguageType } from '../../constants/languages'
import { Button } from '../ui'
import { Loader2 } from 'lucide-react'

interface EditorSectionProps {
  code: string
  language: LanguageType
  isRunning: boolean
  onCodeChange: (code: string) => void
  onLanguageChange: (language: LanguageType) => void
  onExecute: () => void
  supportedLanguages: Record<LanguageType, string>
}

const EditorSection: React.FC<EditorSectionProps> = ({
  code,
  language,
  isRunning,
  onCodeChange,
  onLanguageChange,
  onExecute,
  supportedLanguages,
}) => {
  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault()
        if (!isRunning) {
          onExecute()
        }
      }
    },
    [isRunning, onExecute]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <div className="w-full sm:w-48">
            <LanguageSelector
              value={language}
              onChange={onLanguageChange}
              languages={supportedLanguages}
            />
          </div>
          <Button
            color="primary"
            onClick={onExecute}
            disabled={isRunning}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {isRunning && <Loader2 className="h-4 w-4 animate-spin" />}
            {isRunning ? 'Выполняется...' : 'Run'}
          </Button>
        </div>
      </div>

      <CodeEditor value={code} onChange={onCodeChange} />
      {isRunning && (
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      )}
    </div>
  )
}

export default EditorSection
