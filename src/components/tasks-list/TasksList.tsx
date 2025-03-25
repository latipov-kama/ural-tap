import { useState } from "react";
import { useTasks, useUserTasks } from "../../hooks/query/tasks";
import TaskItem from "../task-item/TaskItem";
import BottomSheet from "../bottom-sheet/BottomSheet";
import { Task } from "../../types/tasks";

interface Props {
  userId: number;
}

const TasksList: React.FC<Props> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { data: tasks } = useTasks();
  const { data: userTasks, refetch } = useUserTasks(userId);

  const completedTaskIds = new Set(userTasks?.map(task => task.taskId));
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const handleOpen = (task: Task) => {
    setSelectedTask(task)
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
    refetch()
  }

  const startTask = () => {
    if (selectedTask) {
      sessionStorage.setItem(`completedTask-${selectedTask.id}`, "true");
      window.open(selectedTask.link, "_blank");
    }
  };

  return (
    <div className="py-8 flex flex-col gap-3">
      {safeTasks.map((item, idx) => (
        <TaskItem
          key={idx}
          task={item}
          userId={userId}
          handleOpen={handleOpen}
          handleClose={handleClose}
          disabled={completedTaskIds.has(item.id)}
        />
      ))}

      <BottomSheet<Task>
        isShow={isOpen}
        setIsShow={setIsOpen}
        item={selectedTask}
        actionLabel="Выполнить"
        onComplete={startTask}
      />
    </div>
  );
};

export default TasksList;
