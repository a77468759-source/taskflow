import { useMemo, useState } from 'react';
import EmptyState from './components/EmptyState.jsx';
import FilterBar from './components/FilterBar.jsx';
import Header from './components/Header.jsx';
import KanbanBoard from './components/KanbanBoard.jsx';
import SearchBar from './components/SearchBar.jsx';
import TaskForm from './components/TaskForm.jsx';
import useLocalStorageTasks from './hooks/useLocalStorage.js';
import { createTaskId } from './utils/taskUtils.js';

export default function App() {
  const [tasks, setTasks, storageError] = useLocalStorageTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [formTask, setFormTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    return tasks.filter((task) => (
      task.title.toLocaleLowerCase().includes(normalizedSearch)
      && (priorityFilter === 'All' || task.priority === priorityFilter)
      && (statusFilter === 'All' || task.status === statusFilter)
    ));
  }, [tasks, searchTerm, priorityFilter, statusFilter]);

  const isFiltering = Boolean(searchTerm.trim()) || priorityFilter !== 'All' || statusFilter !== 'All';

  function openNewTask() {
    setFormTask(null);
    setIsFormOpen(true);
  }

  function openEditTask(task) {
    setFormTask(task);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setFormTask(null);
  }

  function saveTask(values) {
    if (formTask) {
      setTasks((currentTasks) => currentTasks.map((task) => (
        task.id === formTask.id ? { ...task, ...values } : task
      )));
    } else {
      setTasks((currentTasks) => [...currentTasks, {
        id: createTaskId(),
        ...values,
        status: 'Todo',
      }]);
    }
    closeForm();
  }

  function deleteTask(task) {
    if (window.confirm(`Permanently delete "${task.title}"?`)) {
      setTasks((currentTasks) => currentTasks.filter((item) => item.id !== task.id));
    }
  }

  function moveTask(taskId, status) {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, status } : task
    )));
  }

  function clearFilters() {
    setSearchTerm('');
    setPriorityFilter('All');
    setStatusFilter('All');
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <section className="page-intro" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> YOUR WORKSPACE</p>
            <h1 id="page-title">Task board<span className="title-period">.</span></h1>
            <p className="page-description">A clear view of what’s moving and what’s next.</p>
          </div>
          <div className="intro-actions">
            <span className="task-total"><strong>{tasks.length}</strong> {tasks.length === 1 ? 'task' : 'tasks'} in total</span>
            <button className="button button-primary add-task-button" type="button" onClick={openNewTask}>
              <span aria-hidden="true">+</span> Add task
            </button>
          </div>
        </section>

        <section className="board-tools" aria-label="Search and filter tasks">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <FilterBar
            priority={priorityFilter}
            status={statusFilter}
            onPriorityChange={setPriorityFilter}
            onStatusChange={setStatusFilter}
          />
        </section>

        {storageError ? <p className="storage-warning" role="alert">{storageError}</p> : null}

        {tasks.length === 0 ? (
          <EmptyState hasTasks={false} onAddTask={openNewTask} />
        ) : filteredTasks.length === 0 ? (
          <EmptyState hasTasks onClear={clearFilters} />
        ) : (
          <KanbanBoard
            tasks={filteredTasks}
            onEdit={openEditTask}
            onDelete={deleteTask}
            onStatusChange={moveTask}
          />
        )}
        {tasks.length > 0 && filteredTasks.length > 0 && isFiltering ? (
          <p className="results-note" aria-live="polite">
            Showing {filteredTasks.length} of {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </p>
        ) : null}
      </main>
      {isFormOpen ? <TaskForm task={formTask} onClose={closeForm} onSave={saveTask} /> : null}
    </div>
  );
}
