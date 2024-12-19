import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { LanguageType } from '../../constants/languages';

interface EditorState {
  code: string;
  language: LanguageType;
  setCode: (newCode: string) => void;
  setLanguage: (newLanguage: LanguageType) => void;
}

const useEditorStore = create<EditorState>()(
  immer((set) => ({
    code: '',
    language: 'javascript' as LanguageType,
    setCode: (newCode: string) => set((state) => {
      state.code = newCode;
    }),
    setLanguage: (newLanguage: LanguageType) => set((state) => {
      state.language = newLanguage;
    })
  }))
);

export default useEditorStore