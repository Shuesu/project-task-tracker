import type { ChangeEvent } from "react"

type Props = {
    value: string
    onChange: (next: string) => void
}

export function TaskSearch({ value, onChange }: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }

    return (
        <input
            value={value}
            onChange={handleChange}
            placeholder="Search tasks..."
        />
    )
}
