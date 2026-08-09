interface RollButtonProps {
  label: string
  onClick: () => void
}

export function RollButton({ label, onClick }: RollButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-3 px-5 rounded-lg transition-all shadow"
    >
      {label}
    </button>
  )
}
