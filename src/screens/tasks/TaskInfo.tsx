import React from 'react'
import { useParams } from "react-router-dom";
import taskIcon from "../../assets/task-icon.svg"
import sparkles from "../../assets/sparkles.svg"
import Button from '../../components/ui/button/Button';
import Badge from '../../components/ui/badge/Badge';

const TaskInfo = () => {
  const { id } = useParams()

  console.log(id);

  return (
    <div className='py-8'>
      <div className='flex gap-5 w-full p-4'>
        <div className="min-w-12 h-12 rounded-full gradient_btn flex items-center justify-center">
          <img src={taskIcon} alt="task" />
        </div>

        <div>
          <h3 className="text-2xl font-medium mb-2">Бонус за подписку</h3>
          <p className="text-base text-secondary">Подпишись на канал UralTap</p>

          <div className="mt-10">
            <p className='mb-3 text-primary text-sm uppercase'>Награда</p>
            <Badge className='w-fit'>
              <img src={sparkles} alt="sparkles" className="w-6 h-6" />
              {/* {task.price.toLocaleString()} */}
              1000
            </Badge>
          </div>

          <div className='mt-10'>
            <p className='mb-3 text-primary text-sm uppercase'>Дополнительно</p>
            <p className='text-secondary text-base'>На канале UralTap публикуются самые важные, самые свежие, самые крутые новости, акции. Подпишись, чтобы быть в курсе.</p>
          </div>
          <Button className='mt-10'>
            Выполнить
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskInfo