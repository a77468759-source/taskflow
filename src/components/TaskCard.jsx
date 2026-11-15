import { formatDueDate, TASK_STATUSES } from '../utils/taskUtils.js';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className={`task-card${task.status === 'Completed' ? ' is-completed' : ''}`}>
      <div className="task-card-top">
        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          <span className="priority-dot" aria-hidden="true" />
          {task.priority} priority
        </span>
        <div className="card-actions">
          <button className="icon-button" type="button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="m12.8 4.2 3 3M4 16l3.5-.7L16.3 6.5a1.8 1.8 0 0 0-2.6-2.6L4.9 12.7 4 16Z" />
            </svg>
          </button>
          <button className="icon-button danger-hover" type="button" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M4.5 6h11M8 6V4.5h4V6m2.8 0-.6 10H5.8L5.2 6m3.3 3v4m3-4v4" />
            </svg>
          </button>
        </div>
      </div>
      <h3>{task.title}</h3>
      {task.description ? <p className="task-description">{task.description}</p> : null}
      <div className="task-card-bottom">
        <span className="due-date">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <rect x="3.2" y="4.5" width="13.6" height="12" rx="2" />
            <path d="M6.5 3v3m7-3v3M3.5 8h13" />
          </svg>
          {formatDueDate(task.dueDate)}
        </span>
        <label className="status-control">
          <span className="visually-hidden">Move {task.title} to status</span>
          <select value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}>
            {TASK_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </label>
      </div>
    </article>
  );
}
