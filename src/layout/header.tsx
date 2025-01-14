import { MoreVertical, X } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-[#E2ECFF1A] flex items-center justify-between px-5 py-4">
      <button>
        <X size={24} />
      </button>
      <span className="text-lg font-medium">UralTap</span>
      <button>
        <MoreVertical size={24} />
      </button>
    </header>
  )
}

