import TaskItem from "../task-item/TaskItem"

const TasksList = () => {
  const tasks = [
    {
      title: "Ежедневный бонус",
      description: "Получай бонус каждый день",
      price: 100
    },
    {
      title: "Бонус за подписку",
      description: "Подпишись на канал UralTap",
      price: 1000
    },
    {
      title: "Пригласи 5 друзей",
      description: "Отправь пяти друзьям реферальную ссылку",
      price: 1000
    },
    {
      title: "Ежедневный бонус",
      description: "Получай бонус каждый день",
      price: 100
    }
  ]

  return (
    <div className="py-8 flex flex-col gap-3">

      {
        tasks.map((item, idx) => (
          <TaskItem key={idx} {...item} />
        ))
      }

    </div>
  )
}

export default TasksList