import { useState } from 'react'
import type { SearchParams } from '../types/movie'

interface Props {
  onSearch: (params: SearchParams) => void
}

export default function SearchFilters({ onSearch }: Props) {
  const [query, setQuery] = useState('')

  function handleSearch() {
    const params: SearchParams = {
      page: 1, // always reset to page 1 on new search
    }

    if (query) {
      params.query = query
    }

    onSearch(params)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
        placeholder="Search movies..."
        className="w-full sm:flex-1 px-3 py-2 rounded-md border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <button
        onClick={handleSearch}
        className="w-full sm:w-auto px-4 py-2 rounded-md 
                 bg-blue-600 text-white font-medium
                 hover:bg-blue-700 active:bg-blue-800
                 transition-colors"
      >
        Search
      </button>
    </div>
  )
}
