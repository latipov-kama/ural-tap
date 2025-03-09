import sparkles from "../../assets/sparkles.svg"
import Badge from "../ui/badge/Badge"
import Button from "../ui/button/Button"
import { ChevronRight } from "lucide-react"
import TaskSheet from "../task-sheet/TaskSheet"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Task } from "../../types/tasks"
import { useStartTask } from "../../hooks/query/tasks"
import toast from "react-hot-toast"
import { useScoreStore } from "../../stores/score"

interface props {
  task: Task
  userId: number
  disabled?: boolean;
  refetch: () => void
}
const TaskItem: React.FC<props> = ({ task, disabled, userId, refetch }) => {
  const [completed, setCompleted] = useState(disabled);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: startTask } = useStartTask();
  const { balance, updateBalance } = useScoreStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(true)
    };
  }

  const handleComplete = () => {
    if (!disabled) {
      startTask({ taskId: task.id, userId }, {
        onSuccess: () => {
          refetch()
          setCompleted(true)
          setIsOpen(false)
          toast.success("Награда получена")

          if (task.reward) {
            updateBalance(balance + task.reward);
          }
        }
      })
    };
  }

  return (
    <>
      <div
        className={`flex gap-5 w-full p-4 rounded-2xl gradient_bg ${completed ? "opacity-60 cursor-not-allowed" : ""}`}
        onClick={() => !completed && navigate(`/tasks/${task.id}`)}
      >
        <div className="w-12 h-12 rounded-full gradient_btn flex items-center justify-center">
          <img src={task.image?.url} alt="task" />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-1">{task.title}</h3>
          <p className="text-sm">{task.description}</p>

          <div className="mt-3 flex items-center gap-3">
            <Badge>
              <img src={sparkles} alt="sparkles" className="w-6 h-6" />
              {task.reward.toLocaleString()}
            </Badge>
            <Button
              onClick={handleClick}
              disabled={completed}
            >
              {
                completed
                  ? "Выполнено"
                  : <>
                    Выполнить
                    <ChevronRight size={20} />
                  </>
              }
            </Button>
          </div>
        </div>
      </div>

      <TaskSheet
        isShow={isOpen}
        setIsShow={setIsOpen}
        title={task.title}
        description={task.description}
        reward={task.reward}
        onComplete={handleComplete}
      />
    </>
  );
};

export default TaskItem