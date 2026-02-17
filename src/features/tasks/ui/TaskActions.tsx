type Props = {
    completedCount: number
    onClearCompleted: () => void
}

export function TaskActions({ completedCount, onClearCompleted }: Props) {
    return (
        <div style={{ marginTop: 12 }}>
            <button onClick={onClearCompleted} disabled={completedCount === 0}>
                Удалить выполненные
            </button>
        </div>
    )
}
 // validation