import { useState } from "react"
import type {Task} from "./types"

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([])

    function addTask(title: string) {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false
        }

        setTasks(prev => [...prev, newTask])
    }

    function toggleTask(id: string) {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        )
    }

    function removeTask(id: string) {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    return {
        tasks,
        addTask,
        toggleTask,
        removeTask
    }
}

// Что делает данный файл и как он работает в других файлах
// Как сделать такой хук, что сам хук делает