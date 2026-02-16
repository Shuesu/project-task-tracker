// src/features/tasks/ui/Taskfilter
import type { Filter } from "../model/types"

type Props = {
    value: Filter
    onChange: (next: Filter) => void
}

export function TaskFilter({ value, onChange }: Props) {
    return (
        <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 12 }}>
            <button
                onClick={() => onChange("all")}
                disabled={value === "all"}
            >
                All
            </button>

            <button
                onClick={() => onChange("active")}
                disabled={value === "active"}
            >
                Active
            </button>

            <button
                onClick={() => onChange("completed")}
                disabled={value === "completed"}
            >
                Completed
            </button>
        </div>
    )
}