// src/features/tasks/ui/TaskSort.tsx
import type { Sort } from "../model/types"
import type {ChangeEvent} from "react";

type Props = {
    value: Sort
    onChange: (next: Sort) => void
}

export function TaskSort({ value, onChange }: Props) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.currentTarget.value as Sort)
    }
    return (
        <select value={value} onChange={handleChange}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
        </select>
    )
} //+
