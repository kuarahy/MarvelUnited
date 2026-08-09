interface ResultCardProps {
  label: string
  value: string | null
  badge?: string
}

export function ResultCard({ label, value, badge }: ResultCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-1 min-h-[80px] justify-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</span>
      {value ? (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-gray-900">{value}</span>
          {badge && (
            <span className="text-xs bg-red-100 text-red-700 font-medium px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
      ) : (
        <span className="text-gray-300 italic text-sm">Roll to reveal</span>
      )}
    </div>
  )
}
