import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface EditorState {
  code: string
  language: string
  setCode: (newCode: string) => void
  setLanguage: (newLanguage: string) => void
}

const useEditorStore = create<EditorState>()(
  immer((set) => ({
    code: '',
    language: 'javascript',
    setCode: (newCode: string) => set((state) => {
      state.code = newCode
    }),
    setLanguage: (newLanguage: string) => set((state) => {
      state.language = newLanguage
    })
  }))
)

export default useEditorStore