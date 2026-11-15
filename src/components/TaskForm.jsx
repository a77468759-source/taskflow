import { useEffect, useRef, useState } from 'react';
import { TASK_PRIORITIES } from '../utils/taskUtils.js';

function getInitialForm(task) {
  return task
    ? {
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    }
    : { title: '', description: '', priority: '', dueDate: '' };
}

export default function TaskForm({ task, onClose, onSave }) {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const [form, setForm] = useState(() => getInitialForm(task));
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(task);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    titleRef.current?.focus();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Enter a task title.';
    if (!TASK_PRIORITIES.includes(form.priority)) nextErrors.priority = 'Choose a priority.';
    if (!form.dueDate) nextErrors.dueDate = 'Choose a due date.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate,
    });
  }

  return (
    <dialog
      className="task-dialog"
      ref={dialogRef}
      aria-labelledby="task-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="dialog-heading">
        <div>
          <span className="dialog-eyebrow">{isEditing ? 'TASK DETAILS' : 'NEW TASK'}</span>
          <h2 id="task-dialog-title">{isEditing ? 'Edit task' : 'Create a task'}</h2>
          <p>{isEditing ? 'Make changes to this task.' : 'Add a little detail to get things moving.'}</p>
        </div>
        <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label="Close dialog">×</button>
      </div>
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <label className="form-field">
          <span>Task title <b aria-hidden="true">*</b></span>
          <input
            ref={titleRef}
            name="title"
            value={form.title}
            onChange={updateField}
            placeholder="e.g. Plan the product launch"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
            maxLength={120}
          />
          {errors.title ? <span className="field-error" id="title-error">{errors.title}</span> : null}
        </label>
        <label className="form-field">
          <span>Description <small>OPTIONAL</small></span>
          <textarea
            name="description"
            value={form.description}
            onChange={updateField}
            placeholder="Add a few details about this task..."
            rows="4"
            maxLength={500}
          />
        </label>
        <div className="form-row">
          <label className="form-field">
            <span>Priority <b aria-hidden="true">*</b></span>
            <select
              name="priority"
              value={form.priority}
              onChange={updateField}
              aria-invalid={Boolean(errors.priority)}
              aria-describedby={errors.priority ? 'priority-error' : undefined}
            >
              <option value="">Select priority</option>
              {TASK_PRIORITIES.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
            </select>
            {errors.priority ? <span className="field-error" id="priority-error">{errors.priority}</span> : null}
          </label>
          <label className="form-field">
            <span>Due date <b aria-hidden="true">*</b></span>
            <input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={updateField}
              aria-invalid={Boolean(errors.dueDate)}
              aria-describedby={errors.dueDate ? 'due-date-error' : undefined}
            />
            {errors.dueDate ? <span className="field-error" id="due-date-error">{errors.dueDate}</span> : null}
          </label>
        </div>
        <div className="dialog-actions">
          <button className="button button-secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="button button-primary" type="submit">{isEditing ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </dialog>
  );
}
