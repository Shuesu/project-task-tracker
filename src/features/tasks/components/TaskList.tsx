import type { Task } from "../model/types"
import { TaskItem } from "./TaskItem"

type Props = {
    tasks: Task[]
    onToggle: (id: string) => void
    onRemove: (id: string) => void
}

export function TaskList({ tasks, onToggle, onRemove }: Props) {
    return (
        <ul>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    )
}
