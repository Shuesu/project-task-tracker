// src/features/tasks/widgets/TaskPanel.tsx
import { useTasks } from "../model/useTasks"
import { TaskList } from "../ui/TaskList"
import { TaskInput } from "../ui/TaskInput"
import { TaskFilter } from "../ui/TaskFilter"
import {TaskCounters} from "../ui/TaskCounters.tsx";
import { TaskSearch } from "../ui/TaskSearch"
import { TaskSort } from "../ui/TaskSort"
import { TaskActions } from "../ui/TaskActions"


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
        clearCompleted,
        query,
        setQuery,
        sort,
        setSort,
    } = useTasks()

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
            <h1>Task Tracker</h1>

            <TaskInput onAdd={addTask} />
            <TaskSearch value={query} onChange={setQuery} />
            <TaskSort value={sort} onChange={setSort} />
            <TaskFilter value={filter} onChange={setFilter} />

            <TaskCounters
                total={totalCount}
                active={activeCount}
                completed={completedCount}
            />
            <TaskActions
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
            />

            <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onRemove={removeTask}
                onEdit={updateTaskTitle}
            />
        </div>
    )
}
