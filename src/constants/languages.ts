export const SUPPORTED_LANGUAGES = {
  javascript: 'javascript',
  python: 'python',
} as const;

export type LanguageType = keyof typeof SUPPORTED_LANGUAGES;