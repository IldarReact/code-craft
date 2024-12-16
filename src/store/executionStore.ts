import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface ExecutionState {
  output: string
  error: string | null
  setOutput: (newOutput: string) => void
  setError: (newError: string | null) => void
}

const useExecutionStore = create<ExecutionState>()(
  immer((set) => ({
    output: '',
    error: null,
    setOutput: (newOutput: string) => set((state) => {
      state.output = newOutput
    }),
    setError: (newError: string | null) => set((state) => {
      state.error = newError
    })
  }))
)

export default useExecutionStore