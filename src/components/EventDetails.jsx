export default function EventDetails({ title, date, venue }) {
  if (!title) return null;

  const dateText =
    date instanceof Date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString()
      : "";

  return (
    <section className="card">
      <h2 className="h2">{title}</h2>
      <div className="muted">
        <div>{dateText}</div>
        <div>{venue || "Venue not specified"}</div>
      </div>
    </section>
  );
}
