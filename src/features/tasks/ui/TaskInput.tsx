import { useState } from "react"

type Props = {
    onAdd: (title: string) => void
}

export function TaskInput({ onAdd }: Props) {
    const [value, setValue] = useState("")

    function handleAdd() {
        if (!value.trim()) return

        onAdd(value)
        setValue("")
    }

    return (
        <div>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Новая задача"
            />
            <button onClick={handleAdd}>Добавить</button>
        </div>
    )
}
