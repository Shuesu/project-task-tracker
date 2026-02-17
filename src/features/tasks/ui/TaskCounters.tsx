// src/features/tasks/ui/Taskfilter
type Props = {
    total: number;
    completed: number;
    active: number;
};

export function TaskCounters({ total, completed, active }: Props) {
    return (
        <div style={{ display: "flex", gap: 12, margin: "12px 0" }}>
            <span>Всего: {total}</span>
            <span>Готово: {completed}</span>
            <span>Осталось: {active}</span>
        </div>
    );
}