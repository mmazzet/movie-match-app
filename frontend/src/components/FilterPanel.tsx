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
    <div className="flex flex-wrap gap-3 p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
      {/* Genre dropdown */}
      <select
        value={genre ?? ''}
        onChange={(e) => {
          const val = e.target.value
          onGenreChange(val === '' ? null : Number(val))
        }}
        className="px-4 py-2 rounded-md bg-white/8 border border-white/15 text-white text-sm font-medium
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                   transition-all duration-300 cursor-pointer"
      >
        <option value="" className="bg-slate-900 text-white">
          All Genres
        </option>
        <option value="28" className="bg-slate-900 text-white">
          Action
        </option>
        <option value="35" className="bg-slate-900 text-white">
          Comedy
        </option>
        <option value="18" className="bg-slate-900 text-white">
          Drama
        </option>
        <option value="27" className="bg-slate-900 text-white">
          Horror
        </option>
        <option value="878" className="bg-slate-900 text-white">
          Sci-Fi
        </option>
        <option value="10749" className="bg-slate-900 text-white">
          Romance
        </option>
        <option value="16" className="bg-slate-900 text-white">
          Animation
        </option>
        <option value="10402" className="bg-slate-900 text-white">
          Music
        </option>
        <option value="99" className="bg-slate-900 text-white">
          Documentary
        </option>
        <option value="14" className="bg-slate-900 text-white">
          Fantasy
        </option>
      </select>

      {/* Country */}
      <select
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        className="px-4 py-2 rounded-md bg-white/8 border border-white/15 text-white text-sm font-medium
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                   transition-all duration-300 cursor-pointer"
      >
        <option value="" className="bg-slate-900 text-white">
          All Countries
        </option>
        <option value="US" className="bg-slate-900 text-white">
          United States
        </option>
        <option value="IE" className="bg-slate-900 text-white">
          Ireland
        </option>
        <option value="GB" className="bg-slate-900 text-white">
          United Kingdom
        </option>
        <option value="FR" className="bg-slate-900 text-white">
          France
        </option>
        <option value="DE" className="bg-slate-900 text-white">
          Germany
        </option>
        <option value="IT" className="bg-slate-900 text-white">
          Italy
        </option>
        <option value="ES" className="bg-slate-900 text-white">
          Spain
        </option>
        <option value="JP" className="bg-slate-900 text-white">
          Japan
        </option>
        <option value="KR" className="bg-slate-900 text-white">
          South Korea
        </option>
      </select>

      {/* Year from */}
      <input
        type="number"
        value={yearFrom}
        onChange={(e) => onYearFromChange(e.target.value)}
        placeholder="Year from"
        className="w-32 px-4 py-2 rounded-md bg-white/8 border border-white/15 text-white text-sm font-medium placeholder-white/40
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                   transition-all duration-300"
      />

      {/* Year to */}
      <input
        type="number"
        value={yearTo}
        onChange={(e) => onYearToChange(e.target.value)}
        placeholder="Year to"
        className="w-32 px-4 py-2 rounded-md bg-white/8 border border-white/15 text-white text-sm font-medium placeholder-white/40
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                   transition-all duration-300"
      />

      {/* Sort by */}
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="px-4 py-2 rounded-md bg-white/8 border border-white/15 text-white text-sm font-medium
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                   transition-all duration-300 cursor-pointer"
      >
        <option value="popularity.desc" className="bg-slate-900 text-white">
          Most Popular
        </option>
        <option value="vote_average.desc" className="bg-slate-900 text-white">
          Highest Rated
        </option>
        <option
          value="primary_release_date.desc"
          className="bg-slate-900 text-white"
        >
          Newest First
        </option>
        <option
          value="primary_release_date.asc"
          className="bg-slate-900 text-white"
        >
          Oldest First
        </option>
      </select>
    </div>
  )
}
