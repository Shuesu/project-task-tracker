// src/features/tasks/widgets/TaskPanel.tsx
import { useTasks } from "../model/useTasks"
import { TaskInput } from "../ui/TaskInput"
import { TaskSearch } from "../ui/TaskSearch"
import { TaskFilter } from "../ui/TaskFilter"
import { TaskList } from "../ui/TaskList"

export function TaskPanel() {
    const {
        tasks,
        addTask,
        toggleTask,
        removeTask,
        updateTaskTitle,
        filter,
        setFilter,
        totalCount,
        activeCount,
        completedCount,
        query,
        setQuery,
    } = useTasks()

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
            <h1>Task Tracker</h1>

            <TaskInput onAdd={addTask} />
            <TaskSearch value={query} onChange={setQuery} />
            <TaskFilter value={filter} onChange={setFilter} />

            <div style={{ marginBottom: 12 }}>
                Total: {totalCount} | Active: {activeCount} | Completed: {completedCount}
            </div>

            <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onRemove={removeTask}
                onEdit={updateTaskTitle}
            />
        </div>
    )
}
