import { useTasks, useUserTasks } from "../../hooks/query/tasks";
import TaskItem from "../task-item/TaskItem";

interface Props {
  userId: number;
}

const TasksList: React.FC<Props> = ({ userId }) => {
  const { data: tasks } = useTasks();
  const { data: userTasks } = useUserTasks(userId);

  const completedTaskIds = new Set(userTasks?.map(task => task.taskId));

  // Если tasks не массив, устанавливаем пустой массив по умолчанию
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="py-8 flex flex-col gap-3">
      {safeTasks.map((item, idx) => (
        <TaskItem
          key={idx}
          task={item}
          userId={userId}
          disabled={completedTaskIds.has(item.id)}
        />
      ))}
    </div>
  );
};

export default TasksList;
