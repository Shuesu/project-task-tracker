// src/app/App.tsx
import { useTasks } from "../features/tasks/model/useTasks"
import { TaskList } from "../features/tasks/ui/TaskList.tsx"
import { TaskInput } from "../features/tasks/ui/TaskInput"
import { TaskFilter } from "../features/tasks/ui/TaskFilter"

export default function App() {
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
    } = useTasks()

    return (
        <div style={{ maxWidth: 600,margin: "0 auto", padding: 20 }}>
            <h1>Task Tracker</h1>

            <TaskInput onAdd={addTask} />

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
