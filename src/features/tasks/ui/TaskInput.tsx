// src/features/tasks/ui/TaskInput
import { useEffect, useRef, useState } from "react"; // validation

type Props = {
    onAdd: (title: string) => void
}

export function TaskInput({onAdd}: Props) {
    const [value, setValue] = useState("")

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, []) // validation

    function handleAdd() {
        if(!value.trim()) return

        onAdd(value)
        setValue('')
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") handleAdd()
    }

    return (
        <div>
            <input
                ref={inputRef}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder='Новая задача'
                onKeyDown={handleKeyDown}
            />


            <button onClick={handleAdd}>Добавить</button>
        </div>
    )
}