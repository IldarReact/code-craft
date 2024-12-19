import { useCallback } from 'react';
import type { LanguageType } from '../constants/languages';
import useEditorStore from '../store/slices/editorStore';

export const useEditor = () => {
  const { code, language, setCode, setLanguage } = useEditorStore();

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, [setCode]);

  const handleLanguageChange = useCallback((newLanguage: LanguageType) => {
    setLanguage(newLanguage);
  }, [setLanguage]);

  return {
    code,
    language,
    onCodeChange: handleCodeChange,
    onLanguageChange: handleLanguageChange,
  };
};