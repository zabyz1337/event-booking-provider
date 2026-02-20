import { useEventBooking } from "../context/EventBookingContext";

function formatDateKey(date) {
  return new Date(date).toISOString().split("T")[0];
}

export default function EventDetails() {
  const {
    eventsData,
    selectedDateKey,
    selectedEventId,
    selectDate,
    selectEvent,
  } = useEventBooking();

  const selectedDateObj = eventsData.find(
    (d) => formatDateKey(d.date) === selectedDateKey,
  );

  const eventsForDate = selectedDateObj?.events ?? [];

  return (
    <div>
      <h2>Select Date</h2>

      <select
        value={selectedDateKey}
        onChange={(e) => selectDate(e.target.value)}
      >
        {eventsData.map((d) => {
          const key = formatDateKey(d.date);
          return (
            <option key={d.id} value={key}>
              {key}
            </option>
          );
        })}
      </select>

      <h2>Select Event</h2>

      <select
        value={selectedEventId}
        onChange={(e) => selectEvent(Number(e.target.value))}
      >
        {eventsForDate.map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.title}
          </option>
        ))}
      </select>
    </div>
  );
}
