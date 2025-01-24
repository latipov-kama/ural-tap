import React from 'react'
import { useParams } from "react-router-dom";

const TaskInfo = () => {
  const { id } = useParams()

  console.log(id);

  return (
    <div>
      Task Page
    </div>
  )
}

export default TaskInfo