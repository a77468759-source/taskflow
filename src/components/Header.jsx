export default function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Taskflow home">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>taskflow</span>
      </a>
      <div className="topbar-note">
        <span className="avatar" aria-hidden="true">Y</span>
        <span className="topbar-greeting">Your workspace</span>
      </div>
    </header>
  );
}
