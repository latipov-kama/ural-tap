import taskIcon from "../../assets/task-icon.svg"
import sparkles from "../../assets/sparkles.svg"
import Badge from "../ui/badge/Badge"
import Button from "../ui/button/Button"
import { ChevronRight } from "lucide-react"
import TaskSheet from "../task-sheet/TaskSheet"
import { useState } from "react"
import { Link, useNavigate, useNavigation } from "react-router-dom"

interface props {
  task: {
    title: string
    description: string
    price: number
  }
}

const TaskItem: React.FC<props> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div
      className="flex gap-5 w-full p-4 rounded-2xl gradient_bg"
      onClick={() => navigate(`/tasks/1`)}
    >
      <div className="w-12 h-12 rounded-full gradient_btn flex items-center justify-center">
        <img src={taskIcon} alt="task" />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-1">{task.title}</h3>
        <p className="text-sm">{task.description}</p>

        <div className="mt-3 flex items-center gap-3">
          <Badge>
            <img src={sparkles} alt="sparkles" className="w-6 h-6" />
            {task.price.toLocaleString()}
          </Badge>
          <Button onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}>
            Выполнить
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <TaskSheet
        isShow={isOpen}
        setIsShow={setIsOpen}
        title={task.title}
        description={task.description}
        price={task.price} />
    </div>
  )
}

export default TaskItem