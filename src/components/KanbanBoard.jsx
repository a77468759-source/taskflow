import { TASK_STATUSES } from '../utils/taskUtils.js';
import KanbanColumn from './KanbanColumn.jsx';

export default function KanbanBoard({ tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="kanban-board">
      {TASK_STATUSES.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
