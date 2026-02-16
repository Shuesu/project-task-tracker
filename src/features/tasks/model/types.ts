export type Task = {
    id: string
    title: string
    completed: boolean
}

export type Filter = "all" | "active" | "completed"