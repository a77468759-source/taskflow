export default function EmptyState({ hasTasks, onClear, onAddTask }) {
  if (!hasTasks) {
    return (
      <div className="empty-state">
        <div className="empty-illustration" aria-hidden="true">
          <span className="empty-board">
            <i /><i /><i />
          </span>
          <span className="empty-spark">+</span>
        </div>
        <h2>No tasks yet</h2>
        <p>Your next big thing starts with one small task.</p>
        <button className="button button-primary" type="button" onClick={onAddTask}>
          <span aria-hidden="true">+</span> Create your first task
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state no-results">
      <div className="empty-search-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="14" cy="14" r="8" />
          <path d="m20 20 7 7M10.5 14h7" />
        </svg>
      </div>
      <h2>No tasks match your search or filters.</h2>
      <p>Try a different search or clear your filters to see all tasks.</p>
      <button className="button button-secondary" type="button" onClick={onClear}>Clear search and filters</button>
    </div>
  );
}
