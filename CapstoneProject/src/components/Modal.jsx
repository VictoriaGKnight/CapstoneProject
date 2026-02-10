export default function Modal({ title, children, onClose }) {
  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modalCard">
        <div className="modalHeader">
          <h2 className="h2" style={{ margin: 0 }}>{title}</h2>
          <button className="btn btnGhost" onClick={onClose}>✕</button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}
