// src/features/tasks/model/useTasks.ts
import { useEffect, useState } from "react"
import type { Task, Filter, Sort } from "./types"

// ========== const =========
const STORAGE_KEY = "tasks_v1"
const MAX_TITLE_LEN = 60

// ========== helpers (storage, utils) =========

function normalizeTasks(raw: unknown): Task[] {
    if (!Array.isArray(raw)) return []

    const result: Task[] = []

    for (const item of raw) {
        if (!item || typeof item !== "object") continue
        const t = item as any

        const id = typeof t.id === "string" ? t.id : crypto.randomUUID()
        const title = typeof t.title === "string" ? t.title : ""
        const completed = typeof t.completed === "boolean" ? t.completed : false
        const createdAt = typeof t.createdAt === "number" ? t.createdAt : Date.now()

        if (title.trim().length === 0) continue

        result.push({ id, title, completed, createdAt })
    }

    return result
}


function loadTasks(): Task[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    try {
        const parsed = JSON.parse(raw)
        return normalizeTasks(parsed)
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
    const [sort, setSort] = useState<Sort>("newest")

    // ========== actions =========
    function addTask(title: string) {
        const trimmed = title.trim()
        if (!trimmed) return
        const clean = trimmed.slice(0, MAX_TITLE_LEN)

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: clean,
            completed: false,
            createdAt: Date.now(),
        }

        setTasks((prev) => [...prev, newTask])
    }


    function toggleTask(id: string) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    function removeTask(id: string) {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    function updateTaskTitle(id: string, title: string) {
        const trimmed = title.trim()
        if (!trimmed) return
        const clean = trimmed.slice(0, MAX_TITLE_LEN)

        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, title: clean } : task))
        )
    }

    function clearCompleted() {
        setTasks(prev => prev.filter(task => !task.completed))
    } // validation


    // ========== derived =========
    const searchedTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
    )

    const filteredTasks = searchedTasks.filter((task) => {
        if (filter === "active") return !task.completed
        if (filter === "completed") return task.completed
        return true
    })

    //  сортировка ПОСЛЕ поиска+фильтра
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === "newest") return b.createdAt - a.createdAt
        return a.createdAt - b.createdAt
    })

    const totalCount = tasks.length
    const completedCount = tasks.filter((t) => t.completed).length
    const activeCount = totalCount - completedCount

    // side-effect (storage sync)
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }, [tasks])

    // ========== return =========
    return {
        tasks: sortedTasks,
        filter,
        setFilter,
        sort,
        setSort,
        totalCount,
        activeCount,
        completedCount,
        addTask,
        toggleTask,
        removeTask,
        updateTaskTitle,
        query,
        setQuery,
        clearCompleted, // validation
    }
}
