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
    <div className="flex flex-col gap-3 mb-8">
      {/* Search bar row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
          placeholder="Search movies..."
          className="w-full sm:flex-1 px-4 py-3 rounded-md bg-white/8 border border-white/15 
                     text-white placeholder-white/40 font-medium
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                     transition-all duration-300"
        />

        {/* Toggle filters button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full sm:w-auto px-4 py-3 rounded-md border border-white/15 
                     text-white font-semibold hover:bg-white/10 
                     transition-all duration-300"
        >
          {showFilters ? 'Hide Filters' : 'Filters'}
        </button>

        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-6 py-3 rounded-md 
                     bg-red-500 text-white font-semibold
                     hover:bg-red-600 transition-all duration-300
                     transform hover:-translate-y-0.5"
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
