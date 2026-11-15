export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
        <circle cx="8.8" cy="8.8" r="5.8" />
        <path d="m13.2 13.2 4 4" />
      </svg>
      <span className="visually-hidden">Search tasks by title</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks..."
      />
      <kbd aria-hidden="true">/</kbd>
    </label>
  );
}
