import { useState } from 'react'
import type { SearchParams } from '../types/movie'
import FilterPanel from './FilterPanel'

interface Props {
  onSearch: (params: SearchParams) => void
}

export default function SearchFilters({ onSearch }: Props) {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [genre, setGenre] = useState<number | null>(null)
  const [country, setCountry] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [sortBy, setSortBy] = useState('popularity.desc')

  function handleSearch() {
    const params: SearchParams = {
      page: 1,
    }

    if (query) params.query = query
    if (country) params.country = country
    if (genre) params.genre = genre
    if (yearFrom) params.year_from = Number(yearFrom)
    if (yearTo) params.year_to = Number(yearTo)
    params.sort_by = sortBy

    onSearch(params)
  }

  return (
    <div className="flex flex-col gap-3 mb-4">

      {/* Search bar row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
          placeholder="Search movies..."
          className="w-full sm:flex-1 px-3 py-2 rounded-md border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Toggle filters button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300
                     text-gray-700 font-medium hover:bg-gray-100 transition-colors"
        >
          {showFilters ? 'Hide Filters' : 'Filters'}
        </button>

        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-4 py-2 rounded-md 
                     bg-blue-600 text-white font-medium
                     hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Filter panel — only shown when toggled */}
      {showFilters && (
        <FilterPanel
          genre={genre}
          country={country}
          yearFrom={yearFrom}
          yearTo={yearTo}
          sortBy={sortBy}
          onGenreChange={setGenre}
          onCountryChange={setCountry}
          onYearFromChange={setYearFrom}
          onYearToChange={setYearTo}
          onSortByChange={setSortBy}
        />
      )}

    </div>
  )
}