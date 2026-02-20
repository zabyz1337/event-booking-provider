import { createContext, useContext, useMemo, useState } from "react";

const EventBookingContext = createContext(null);

function formatDateKey(date) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

export function EventBookingProvider({ eventsData, children }) {
  const initialDate = formatDateKey(eventsData[0].date);
  const initialEvent = eventsData[0].events[0].id;

  const [selectedDateKey, setSelectedDateKey] = useState(initialDate);
  const [selectedEventId, setSelectedEventId] = useState(initialEvent);

  const selectedDateObj = useMemo(
    () => eventsData.find((d) => formatDateKey(d.date) === selectedDateKey),
    [eventsData, selectedDateKey],
  );

  const eventsForDate = selectedDateObj?.events ?? [];

  const selectedEvent = eventsForDate.find((ev) => ev.id === selectedEventId);

  const [seatsState, setSeatsState] = useState(() => {
    const map = {};
    eventsData.forEach((day) => {
      day.events.forEach((ev) => {
        ev.seats.forEach((seat) => {
          map[`${ev.id}:${seat.id}`] = seat.isSelected;
        });
      });
    });
    return map;
  });

  const seatsForSelectedEvent = selectedEvent
    ? selectedEvent.seats.map((seat) => ({
        ...seat,
        isSelected: seatsState[`${selectedEvent.id}:${seat.id}`],
      }))
    : [];

  function selectDate(dateKey) {
    setSelectedDateKey(dateKey);
    const newDate = eventsData.find((d) => formatDateKey(d.date) === dateKey);
    setSelectedEventId(newDate?.events[0]?.id ?? null);
  }

  function selectEvent(id) {
    setSelectedEventId(id);
  }

  function toggleSeat(seatId) {
    const key = `${selectedEvent.id}:${seatId}`;
    setSeatsState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <EventBookingContext.Provider
      value={{
        eventsData,
        selectedDateKey,
        selectedEventId,
        seatsForSelectedEvent,
        selectedEvent,
        selectDate,
        selectEvent,
        toggleSeat,
      }}
    >
      {children}
    </EventBookingContext.Provider>
  );
}

export function useEventBooking() {
  return useContext(EventBookingContext);
}
