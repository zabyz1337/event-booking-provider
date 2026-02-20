import { useEventBooking } from "../context/EventBookingContext";

export default function SeatSelector() {
  const { seatsForSelectedEvent, toggleSeat } = useEventBooking();

  return (
    <div>
      <h2>Select Seats</h2>

      {seatsForSelectedEvent.map((seat) => (
        <button
          key={seat.id}
          onClick={() => toggleSeat(seat.id)}
          style={{
            margin: 5,
            padding: 10,
            background: seat.isSelected ? "black" : "white",
            color: seat.isSelected ? "white" : "black",
          }}
        >
          {seat.label}
        </button>
      ))}
    </div>
  );
}
