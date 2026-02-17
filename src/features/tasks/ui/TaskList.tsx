// src/features/tasks/ui/TaskList.tsx
import type { Task } from "../model/types.ts"
import { TaskItem } from "../components/TaskItem.tsx"

type Props = {
    tasks: Task[]
    onToggle: (id: string) => void
    onRemove: (id: string) => void
    onEdit: (id: string, title: string) => void
}

export function TaskList({ tasks, onToggle, onRemove, onEdit }: Props) {
    return (
        <ul  style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
        }}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    )
}
