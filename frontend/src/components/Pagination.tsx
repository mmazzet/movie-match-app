interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-6 py-3 rounded-md bg-white/10 border border-white/20 text-white font-semibold 
                   disabled:opacity-40 disabled:cursor-not-allowed
                   hover:enabled:bg-white/15 hover:enabled:border-white/30 
                   transition-all duration-300 transform hover:enabled:-translate-y-0.5"
      >
        ← Previous
      </button>

      <span className="text-sm text-white/70 font-semibold min-w-16 text-center">
        {page} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-6 py-3 rounded-md bg-white/10 border border-white/20 text-white font-semibold 
                   disabled:opacity-40 disabled:cursor-not-allowed
                   hover:enabled:bg-white/15 hover:enabled:border-white/30 
                   transition-all duration-300 transform hover:enabled:-translate-y-0.5"
      >
        Next →
      </button>
    </div>
  )
}
