// src/features/tasks/components/TaskItem.tsx
import { useEffect, useState } from "react"
import type { Task } from "../model/types"

type Props = {
    task: Task
    onToggle: (id: string) => void
    onRemove: (id: string) => void
    onEdit: (id: string, title: string) => void
}

export function TaskItem({ task, onToggle, onRemove, onEdit }: Props) {

    // состояние интерфейса (НЕ бизнес-данные!)
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(task.title)

    /* ---------------- SYNC WITH MODEL ---------------- */
    // модель могла измениться снаружи → обновляем input

    useEffect(() => {
        setValue(task.title)
    }, [task.title])


    /* ---------------- UI ACTIONS ---------------- */
    // действия пользователя внутри компонента

    function startEdit() {
        setIsEditing(true)
        setValue(task.title)
    }

    function cancelEdit() {
        setIsEditing(false)
        setValue(task.title)
    }

    function saveEdit() {
        const trimmed = value.trim()
        if (!trimmed) return
        onEdit(task.id, trimmed)   // передаем в бизнес-логику
        setIsEditing(false)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") saveEdit()
        if (e.key === "Escape") cancelEdit()
    }

    return (
        <li
            style={{
                display: "flex",
                alignItems: "flex-start", // чтобы при переносе строки кнопки были сверху
                gap: 8,
                width: "100%",
            }}
        >
            {isEditing ? (
                <input
                    autoFocus
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={saveEdit}
                    style={{ flex: 1, minWidth: 0 }}
                />
            ) : (
                <span
                    style={{
                        textDecoration: task.completed ? "line-through" : "none",
                        cursor: "pointer",
                        padding: "2px 6px",
                        borderRadius: 6,
                        userSelect: "none",

                        /* перенос длинного текста */
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                    }}
                    onClick={() => onToggle(task.id)}
                >
                {task.title}
            </span>
            )}

            <div
                style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: 4,
                    flexShrink: 0, // кнопки не сжимаются
                }}
            >
                {!isEditing && (
                    <button onClick={startEdit}>Edit</button>
                )}

                {isEditing && (
                    <>
                        <button onClick={saveEdit}>Save</button>
                        <button
                            onMouseDown={(e) => e.preventDefault()} // не даем onBlur сохранить
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    </>
                )}

                <button onClick={() => onRemove(task.id)}>❌</button>
            </div>
        </li>
    )


}
