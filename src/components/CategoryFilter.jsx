export default function CategoryFilter({ categories, selected, onSelect, onClear }) {
    return (
      <div className="mb-4 d-flex flex-wrap align-items-center gap-2">
        <strong className="me-2">Filter by Category:</strong>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${selected === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
        <button className="btn btn-sm btn-secondary" onClick={onClear}>
          Clear Filter
        </button>
      </div>
    );
  }
  