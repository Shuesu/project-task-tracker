import type { Task } from "../model/types"

type Props = {
    task: Task
    onToggle: (id: string) => void
    onRemove: (id: string) => void
}

export function TaskItem({ task, onToggle, onRemove }: Props) {
    return (
        <li>
      <span
          style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer"
          }}
          onClick={() => onToggle(task.id)}
      >
        {task.title}
      </span>

            <button onClick={() => onRemove(task.id)}>❌</button>
        </li>
    )
}
