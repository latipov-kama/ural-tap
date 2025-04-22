import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sparkles from "../../assets/sparkles.svg";
import Button from '../../components/ui/button/Button';
import Badge from '../../components/ui/badge/Badge';
import { useStartTask, useTask, useUserTasks } from "../../hooks/query/tasks";
import { useAuthStore } from "../../stores/auth";
import toast from "react-hot-toast";
import { useScoreStore } from "../../stores/score";

const TaskInfo = () => {
  const { id } = useParams();
  const { userId } = useAuthStore();
  const navigate = useNavigate();
  const taskId = id ? +id : 0;
  const { balance, updateBalance } = useScoreStore();

  const { data: task, isLoading } = useTask(taskId);
  const { data: userTasks, refetch } = useUserTasks(userId ?? 0);
  const { mutate: startTask, isPending } = useStartTask();

  const isCompleted = userTasks?.some(userTask => userTask.taskId === taskId);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!taskId || !userTasks) return;

      const completedTask = sessionStorage.getItem(`completedTask-${taskId}`);

      if (completedTask && !isCompleted) {
        sessionStorage.removeItem(`completedTask-${taskId}`);

        handleComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [taskId, userTasks]);

  const handleComplete = () => {
    if (!task || !userId) return;

    startTask({ taskId: task.id, userId }, {
      onSuccess: async () => {
        await refetch();
        toast.success("Награда получена", { duration: 3000 });

        if (task.reward) {
          updateBalance(balance + task.reward);
        }

        setTimeout(() => {
          navigate("/tasks");
        }, 1000);
      }
    });
  };

  const handleStartTask = () => {
    if (!task) return;

    sessionStorage.setItem(`completedTask-${taskId}`, "true");

    window.open(task.link, "_blank");
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (!task) return <p>Задача не найдена.</p>;

  return (
    <div className='py-8'>
      <div className='flex gap-5 w-full p-4'>
        <div className="min-w-12 max-w-12 h-12 rounded-full overflow-hidden gradient_btn flex items-center justify-center">
          {task.image && <img src={task.image?.url} alt="task" className="w-full h-full object-cover" />}
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

          <Button
            className={`mt-10 duration-150 ease-in-out ${isCompleted ? "opacity-60 cursor-not-allowed" : ""}`}
            onClick={handleStartTask}
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
