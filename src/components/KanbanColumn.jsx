import TaskCard from './TaskCard.jsx';

export default function KanbanColumn({
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const columnStyle = status.toLowerCase().replace(' ', '-');

  return (
    <section className={`kanban-column column-${columnStyle}`} aria-labelledby={`heading-${columnStyle}`}>
      <div className="column-heading">
        <div className="column-title-wrap">
          <span className="column-indicator" aria-hidden="true" />
          <h2 id={`heading-${columnStyle}`}>{status}</h2>
          <span className="column-count" aria-label={`${tasks.length} tasks`}>{tasks.length}</span>
        </div>
      </div>
      <div className="column-cards">
        {tasks.length ? tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        )) : (
          <p className="column-empty">Nothing here yet</p>
        )}
      </div>
    </section>
  );
}
