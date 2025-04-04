import TasksList from '../../components/tasks-list/TasksList'
import { useAuthStore } from '../../stores/auth';

const Tasks = () => {
  const { user } = useAuthStore();

  return (
    <div className='p-5 py-8 h-full'>
      <h2 className='text-3xl font-semibold mb-2'>Баллы за задания</h2>
      <p className='text-sm text-secondary'>Выполняй задания и получай больше баллов</p>

      {user?.id && <TasksList userId={user?.id} />}
    </div>
  )
}

export default Tasks