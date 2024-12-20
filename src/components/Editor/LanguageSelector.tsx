import React from 'react';
import Select from '../ui/Select';
import type { LanguageType } from '../../constants/languages';

interface LanguageSelectorProps {
  value: LanguageType;
  onChange: (newLanguage: LanguageType) => void;
  languages: Record<LanguageType, string>;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  languages,
}) => {

  const hasLanguages = languages && Object.keys(languages).length > 0;
  const languageOptions = hasLanguages
    ? Object.entries(languages).map(([key, label]) => ({ value: key, label }))
    : [];

  // Проверка значения value
  const isValidValue = Object.keys(languages).includes(value);

  if (!isValidValue) {
    console.error(`Invalid value: "${value}" is not in languages.`);
    return <div>Invalid selected language</div>;
  }

  if (!hasLanguages || languageOptions.length === 0) {
    console.warn("Language options are empty or unavailable.");
    return <div>No languages available</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as LanguageType;
    console.log("Selected language:", newLanguage);

    if (Object.keys(languages).includes(newLanguage)) {
      onChange(newLanguage);
    } else {
      console.error(`Invalid language selected: ${newLanguage}`);
    }
  };

  return (
    <div className="w-full">
      <Select
        value={value}
        onChange={handleChange}
        aria-label="Select a programming language"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default LanguageSelector;