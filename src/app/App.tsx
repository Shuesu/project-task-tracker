import { useTasks } from "../features/tasks/model/useTasks"
import { TaskList } from "../features/tasks/components/TaskList"
import { TaskInput } from "../features/tasks/ui/TaskInput"

export default function App() {
    const { tasks, addTask, toggleTask, removeTask } = useTasks()

    return (
        <div style={{ padding: 20 }}>
            <h1>Task Tracker</h1>

            <TaskInput onAdd={addTask} />

            <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onRemove={removeTask}
            />
        </div>
    )
}
