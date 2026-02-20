export default function SeatSelector({ seats, selectedSeatIds, onToggleSeat }) {
  if (!seats?.length) return null;

  return (
    <section className="card">
      <h3 className="h3">Choose seats</h3>

      <div className="seats">
        {seats.map((seat) => {
          const isTaken = Boolean(seat.isSelected);
          const isPicked = selectedSeatIds.has(seat.id);

          return (
            <button
              key={seat.id}
              type="button"
              className={[
                "seat",
                isTaken ? "seat--taken" : "",
                isPicked ? "seat--picked" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={isTaken}
              onClick={() => onToggleSeat(seat.id)}
            >
              {seat.label}
            </button>
          );
        })}
      </div>

      <div className="muted">
        Taken seats are disabled. Picked seats are highlighted.
      </div>
    </section>
  );
}
