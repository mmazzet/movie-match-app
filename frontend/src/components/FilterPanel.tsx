interface FilterPanelProps {
  genre: number | null
  country: string
  yearFrom: string
  yearTo: string
  sortBy: string
  onGenreChange: (value: number | null) => void
  onCountryChange: (value: string) => void
  onYearFromChange: (value: string) => void
  onYearToChange: (value: string) => void
  onSortByChange: (value: string) => void
}

export default function FilterPanel({
  genre,
  country,
  yearFrom,
  yearTo,
  sortBy,
  onGenreChange,
  onCountryChange,
  onYearFromChange,
  onYearToChange,
  onSortByChange,
}: FilterPanelProps) {
  return (
    <div className="flex flex-wrap gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
      {/* Genre dropdown */}
      <select
        value={genre ?? ''}
        onChange={(e) => {
          const val = e.target.value
          onGenreChange(val === '' ? null : Number(val))
        }}
        className="px-3 py-2 rounded-md border border-gray-300 text-sm"
      >
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="27">Horror</option>
        <option value="878">Sci-Fi</option>
        <option value="10749">Romance</option>
        <option value="16">Animation</option>
        <option value="10402">Music</option>
        <option value="99">Documentary</option>
        <option value="14">Fantasy</option>
      </select>

      {/* Country */}
      <select
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        className="px-3 py-2 rounded-md border border-gray-300 text-sm"
      >
        <option value="">All Countries</option>
        <option value="US">United States</option>
        <option value="IE">Ireland</option>
        <option value="GB">United Kingdom</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
        <option value="IT">Italy</option>
        <option value="ES">Spain</option>
        <option value="JP">Japan</option>
        <option value="KR">South Korea</option>
      </select>

      {/* Year from */}
      <input
        type="number"
        value={yearFrom}
        onChange={(e) => onYearFromChange(e.target.value)}
        placeholder="Year from"
        className="w-28 px-3 py-2 rounded-md border border-gray-300 text-sm"
      />

      {/* Year to */}
      <input
        type="number"
        value={yearTo}
        onChange={(e) => onYearToChange(e.target.value)}
        placeholder="Year to"
        className="w-28 px-3 py-2 rounded-md border border-gray-300 text-sm"
      />

      {/* Sort by */}
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="px-3 py-2 rounded-md border border-gray-300 text-sm"
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="vote_average.desc">Highest Rated</option>
        <option value="primary_release_date.desc">Newest First</option>
        <option value="primary_release_date.asc">Oldest First</option>
      </select>
    </div>
  )
}
