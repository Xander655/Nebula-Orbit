import { useState, useEffect } from 'react'

type SearchInputProps = {
  placeholder?: string
  onSearch: (value: string) => void
  delay?: number
  minLength?: number
  className?: string
}

export function SearchInput({
  placeholder = 'Search...',
  onSearch,
  delay = 300,
  minLength = 0,
  className = '',
}: SearchInputProps) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const trimmed = value.trim()

    const timeout = setTimeout(() => {
      if (trimmed.length >= minLength || trimmed.length === 0) {
        onSearch(trimmed)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay, minLength, onSearch])

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="border px-3 py-2 pr-8 w-full rounded"
        aria-label="Search"
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}
