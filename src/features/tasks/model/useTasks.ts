// src/features/tasks/model/useTasks.ts
import { useEffect, useState } from "react"
import type { Task, Filter } from "./types"

// ========== consts =========
const STORAGE_KEY = "tasks_v1"

// ========== helpers (storage, utils) =========
function loadTasks(): Task[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    try {
        const saved = JSON.parse(raw) as Task[]
        if (!Array.isArray(saved)) return []
        return saved
    } catch {
        localStorage.removeItem(STORAGE_KEY)
        return []
    }
}

export function useTasks() {
    // ========== hook state =========
    const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
    const [filter, setFilter] = useState<Filter>("all")
    const [query, setQuery] = useState("")

    // ========== actions =========
    function addTask(title: string) {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
        }
        setTasks(prev => [...prev, newTask])
    }

    function toggleTask(id: string) {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    function removeTask(id: string) {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    function updateTaskTitle(id: string, title: string) {
        setTasks(prev =>
            prev.map(task => (task.id === id ? { ...task, title } : task))
        )
    }

    // ========== derived =========

    const searchedTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(query.toLowerCase())
    )

    const filteredTasks = searchedTasks.filter(task => {
        if (filter === "active") return !task.completed
        if (filter === "completed") return task.completed
        return true
    })


    const totalCount = tasks.length
    const completedCount = tasks.filter(t => t.completed).length
    const activeCount = totalCount - completedCount

    // side-effect (storage sync) — логика та же, просто рядом с derived/return
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }, [tasks])

    // ========== return =========
    return {
        tasks: filteredTasks,
        filter,
        setFilter,
        totalCount,
        activeCount,
        completedCount,
        addTask,
        toggleTask,
        removeTask,
        updateTaskTitle,
        query,
        setQuery,
    }
}
