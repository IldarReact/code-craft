import React from 'react'
import Select from '../ui/Select'

interface LanguageSelectorProps {
  value: string
  onChange: (newLanguage: string) => void
  languages: { [key: string]: string }
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  languages
}) => {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {Object.entries(languages).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </Select>
  )
}

export default LanguageSelector