import EventBooking from "./components/EventBooking";
import { EventBookingProvider } from "./context/EventBookingContext";

const eventsData = [
  {
    id: 237632,
    date: new Date("2026-03-21"),
    events: [
      {
        id: 7843687,
        title: "Gorvin Show",
        seats: [
          { id: 1, label: "2a", isSelected: false },
          { id: 2, label: "2b", isSelected: false },
          { id: 3, label: "2c", isSelected: true },
        ],
      },
    ],
  },
];

export default function App() {
  return (
    <EventBookingProvider eventsData={eventsData}>
      <EventBooking />
    </EventBookingProvider>
  );
}
