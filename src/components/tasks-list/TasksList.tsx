import { useTasks } from "../../hooks/query/tasks"
import TaskItem from "../task-item/TaskItem"

const TasksList = () => {
  const { data: tasks } = useTasks()

  return (
    <div className="py-8 flex flex-col gap-3">

      {
        tasks?.map((item, idx) => (
          <TaskItem key={idx} task={item} />
        ))
      }

    </div>
  )
}

export default TasksList