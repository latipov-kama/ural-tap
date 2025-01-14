import { ReactNode } from 'react'

interface props {
  children: ReactNode
  className?: string;
}

const Badge: React.FC<props> = ({ children, className }) => {
  return (
    <div className={`gradient_bg py-2.5 px-4 rounded-3xl flex items-center gap-1.5 ${className}`}>
      {children}
    </div>
  )
}

export default Badge