import { createContext, useContext, useMemo, useState } from "react";

const EventBookingContext = createContext(null);

function formatDateKey(date) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

export function EventBookingProvider({ eventsData, children }) {
  const initialDateKey = formatDateKey(eventsData[0].date);
  const initialEventId = eventsData[0].events[0].id;

  const [selectedDateKey, setSelectedDateKey] = useState(initialDateKey);
  const [selectedEventId, setSelectedEventId] = useState(initialEventId);

  const selectedDateObj = useMemo(() => {
    return eventsData.find((d) => formatDateKey(d.date) === selectedDateKey);
  }, [eventsData, selectedDateKey]);

  const eventsForDate = selectedDateObj?.events ?? [];

  const selectedEvent = useMemo(() => {
    return eventsForDate.find((ev) => ev.id === selectedEventId);
  }, [eventsForDate, selectedEventId]);

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

  const seatsForSelectedEvent = useMemo(() => {
    if (!selectedEvent) return [];

    return selectedEvent.seats.map((seat) => ({
      ...seat,
      isSelected: seatsState[`${selectedEvent.id}:${seat.id}`],
    }));
  }, [selectedEvent, seatsState]);

  function selectDate(dateKey) {
    setSelectedDateKey(dateKey);

    const newDate = eventsData.find((d) => formatDateKey(d.date) === dateKey);

    setSelectedEventId(newDate?.events[0]?.id ?? null);
  }

  function selectEvent(eventId) {
    setSelectedEventId(eventId);
  }

  function toggleSeat(seatId) {
    if (!selectedEvent) return;

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
        selectedEvent,
        seatsForSelectedEvent,
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
  const context = useContext(EventBookingContext);

  if (!context) {
    throw new Error("useEventBooking must be used inside EventBookingProvider");
  }

  return context;
}
