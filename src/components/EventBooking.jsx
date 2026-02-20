import { useMemo, useState } from "react";
import EventDetails from "./EventDetails.jsx";
import SeatSelector from "./SeatSelector.jsx";

function toDateInputValue(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function EventBooking({ eventsData }) {
  const [selectedDateStr, setSelectedDateStr] = useState(() =>
    eventsData?.[0]?.date ? toDateInputValue(eventsData[0].date) : "",
  );
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedSeatIds, setSelectedSeatIds] = useState(new Set());

  const selectedDate = useMemo(() => {
    if (!selectedDateStr) return null;
    const d = new Date(selectedDateStr);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }, [selectedDateStr]);

  const dayBlock = useMemo(() => {
    if (!selectedDate) return null;
    return (
      (eventsData || []).find((x) => sameDay(x.date, selectedDate)) || null
    );
  }, [eventsData, selectedDate]);

  const eventsForDay = dayBlock?.events || [];

  const selectedEvent = useMemo(() => {
    const idNum = Number(selectedEventId);
    if (!idNum) return null;
    return eventsForDay.find((e) => e.id === idNum) || null;
  }, [eventsForDay, selectedEventId]);

  const seats = selectedEvent?.seats || [];

  function onChangeDate(e) {
    const next = e.target.value;
    setSelectedDateStr(next);
    setSelectedEventId("");
    setSelectedSeatIds(new Set());
  }

  function onChangeEvent(e) {
    setSelectedEventId(e.target.value);
    setSelectedSeatIds(new Set());
  }

  function onToggleSeat(seatId) {
    setSelectedSeatIds((prev) => {
      const next = new Set(prev);
      if (next.has(seatId)) next.delete(seatId);
      else next.add(seatId);
      return next;
    });
  }

  const pickedLabels = useMemo(() => {
    if (!seats.length || selectedSeatIds.size === 0) return [];
    const map = new Map(seats.map((s) => [s.id, s.label]));
    return [...selectedSeatIds].map((id) => map.get(id)).filter(Boolean);
  }, [seats, selectedSeatIds]);

  return (
    <div className="layout">
      <section className="card">
        <h1 className="h1">Event booking</h1>

        <div className="row">
          <label className="label">
            Date
            <input
              className="input"
              type="date"
              value={selectedDateStr}
              onChange={onChangeDate}
            />
          </label>

          <label className="label">
            Event
            <select
              className="input"
              value={selectedEventId}
              onChange={onChangeEvent}
              disabled={!eventsForDay.length}
            >
              <option value="">Select event</option>
              {eventsForDay.map((ev) => (
                <option key={ev.id} value={String(ev.id)}>
                  {ev.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        {!eventsForDay.length && selectedDateStr && (
          <div className="muted">No events for this date.</div>
        )}
      </section>

      <EventDetails
        title={selectedEvent?.title}
        date={selectedDate}
        venue="Main Venue"
      />

      {selectedEvent && (
        <SeatSelector
          seats={seats}
          selectedSeatIds={selectedSeatIds}
          onToggleSeat={onToggleSeat}
        />
      )}

      {selectedEvent && (
        <section className="card">
          <h3 className="h3">Summary</h3>
          <div className="muted">
            Picked seats: {pickedLabels.length ? pickedLabels.join(", ") : "—"}
          </div>
        </section>
      )}
    </div>
  );
}
