import { Dispatch, SetStateAction } from 'react'
import Badge from '../ui/badge/Badge'
import Button from '../ui/button/Button'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion";
import sparkles from "../../assets/sparkles.svg"
import { SheetItem } from '../../types';

interface BottomSheetProps<T> {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  item: T | null
  actionLabel: string
  onComplete: () => void
}

const BottomSheet = <T extends SheetItem>({ isShow, setIsShow, item, actionLabel, onComplete }: BottomSheetProps<T>) => {
  return (
    <AnimatePresence>
      {isShow && item && (
        <>
          <motion.div
            className='wrapper w-full h-full bg-[#090c1a80] absolute left-0 top-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsShow(false)}
          />

          <motion.div
            className='gradient_sheet w-full min-h-[58%] py-8 px-5 pb-28 rounded-t-2xl fixed bottom-0 left-0 z-30'
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className='h-full flex flex-col items-center justify-between'>
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden gradient_btn flex items-center justify-center mb-4">
                {item.image && <img src={item.image?.url} alt={item.title} className='w-full h-full object-cover' />}
              </div>

              <div className='text-center mb-6'>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-secondary">{item.description}</p>
              </div>

              <Badge className='mb-4'>
                <img src={sparkles} alt="sparkles" className="w-6 h-6" />
                {item.reward && item.reward.toLocaleString()}
                {item.cost && item.cost.toLocaleString()}
                {item.price && item.price.toLocaleString()}
              </Badge>

              <Button
                className='px-7 relative z-0'
                onClick={onComplete}>
                {actionLabel}
              </Button>
            </div>

            <button
              className='absolute right-5 top-5'
              onClick={(e) => {
                setIsShow(false)
                e.stopPropagation()
              }}>
              <X className='w-6 text-primary' />
            </button>
          </motion.div>
        </>
      )
      }
    </AnimatePresence >
  )
}

export default BottomSheet