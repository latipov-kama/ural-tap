import { useNavigate, useParams } from "react-router-dom";
import taskIcon from "../../assets/task-icon.svg";
import sparkles from "../../assets/sparkles.svg";
import Button from '../../components/ui/button/Button';
import Badge from '../../components/ui/badge/Badge';
import { useStartTask, useTask, useUserTasks } from "../../hooks/query/tasks";
import { useAuthStore } from "../../stores/auth";

const TaskInfo = () => {
  const { id } = useParams();
  const { userId } = useAuthStore();
  const navigate = useNavigate();
  const taskId = id ? +id : 0;

  const { data: task, isLoading } = useTask(taskId);
  const { data: userTasks } = useUserTasks(userId ?? 0);

  const { mutate: startTask, isPending } = useStartTask();

  // Проверяем, выполнена ли задача
  const isCompleted = userTasks?.some(userTask => userTask.taskId === taskId);

  const handleComplete = () => {
    if (!task || !userId || isCompleted) return;

    startTask({ taskId: task.id, userId }, {
      onSuccess: () => {
        navigate("/tasks")
      }
    });
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (!task) {
    return <p>Задача не найдена.</p>;
  }

  return (
    <div className='py-8'>
      <div className='flex gap-5 w-full p-4'>
        <div className="min-w-12 h-12 rounded-full gradient_btn flex items-center justify-center">
          <img src={taskIcon} alt="task" />
        </div>

        <div>
          <h3 className="text-2xl font-medium mb-2">{task.title}</h3>
          <p className="text-base text-secondary">{task.description}</p>

          <div className="mt-10">
            <p className='mb-3 text-primary text-sm uppercase'>Награда</p>
            <Badge className={`w-fit ${isCompleted ? "opacity-60" : ""}`}>
              <img src={sparkles} alt="sparkles" className="w-6 h-6" />
              {task.reward ? task.reward.toLocaleString() : "Нет данных"}
            </Badge>
          </div>

          <div className='mt-10'>
            <p className='mb-3 text-primary text-sm uppercase'>Дополнительно</p>
            <p className='text-secondary text-base'>
              На канале UralTap публикуются самые важные, самые свежие, самые крутые новости, акции. Подпишись, чтобы быть в курсе.
            </p>
          </div>

          <Button
            className={`mt-10 duration-150 ease-in-out ${isCompleted ? "opacity-60 cursor-not-allowed" : ""}`}
            onClick={handleComplete}
            disabled={isCompleted}
          >
            {isCompleted ? "Выполнено" : isPending ? "Loading..." : "Выполнить"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
