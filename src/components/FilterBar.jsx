export default function FilterBar({
  priority,
  status,
  onPriorityChange,
  onStatusChange,
}) {
  return (
    <div className="filters" aria-label="Task filters">
      <label className="filter-field">
        <span>Priority</span>
        <select value={priority} onChange={(event) => onPriorityChange(event.target.value)}>
          <option value="All">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <label className="filter-field">
        <span>Status</span>
        <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="All">All statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
    </div>
  );
}
