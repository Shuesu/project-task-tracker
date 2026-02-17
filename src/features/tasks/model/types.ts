export type Task = {
    id: string
    title: string
    completed: boolean
    createdAt: number
}

export type Filter = "all" | "active" | "completed"

export type Sort = "newest" | "oldest" // +