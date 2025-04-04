import { CircleAlert } from 'lucide-react'
import React from 'react'

interface props {
  title: string
}

const NotFound: React.FC<props> = ({ title }) => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-2 text-secondary text-xl'>
      <CircleAlert size={32} />
      {title}
    </div>
  )
}

export default NotFound