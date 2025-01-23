import task from "../../assets/task-icon.svg"
import sparkles from "../../assets/sparkles.svg"
import Badge from "../ui/badge/Badge"
import Button from "../ui/button/Button"
import { ChevronRight } from "lucide-react"
import TaskSheet from "../task-sheet/TaskSheet"
import { useState } from "react"

interface props {
  title: string
  description: string
  price: number
}

const TaskItem: React.FC<props> = ({ title, description, price }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-5 w-full p-4 rounded-2xl gradient_bg">
      <div className="w-12 h-12 rounded-full gradient_btn flex items-center justify-center">
        <img src={task} alt="task" />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm">{description}</p>

        <div className="mt-3 flex items-center gap-3">
          <Badge>
            <img src={sparkles} alt="sparkles" className="w-6 h-6" />
            {price.toLocaleString()}
          </Badge>
          <Button onClick={() => setIsOpen(true)}>
            Выполнить
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <TaskSheet
        isShow={isOpen}
        setIsShow={setIsOpen}
        title={title}
        description={description}
        price={price} />
    </div>
  )
}

export default TaskItem