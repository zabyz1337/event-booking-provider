Создание структуры проекта
Внутри папки src, создайте подпапку components, где будут храниться все компоненты приложения.
В папке components создайте файлы для каждого компонента: EventDetails.js, SeatSelector.js и EventBooking.js.
Разработка компонентов
EventDetails компонент: Этот компонент отвечает за отображение информации о событии, такой как название, дата и место проведения.

SeatSelector компонент: Разработайте компонент для выбора мест. Компонент должен позволять пользователю выбирать места из списка доступных мест.
EventBooking компонент: Это родительский компонент, который будет интегрировать EventDetails и SeatSelector. Управляет состоянием выбранных мест и передает нужные данные дочерним компонентам.Пользователь может выбрать любую дату (DataSelector), а затем и мероприятия, которые проходят в эту дату.
Интеграция компонентов
Интегрируйте компоненты в App.js, который является главным компонентом приложения.
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
{ id: 4, label: "3a", isSelected: false },
{ id: 5, label: "3b", isSelected: false },
{ id: 6, label: "3c", isSelected: false }
]
},
{
id: 7843688,
title: "Comedy Night",
seats: [
{ id: 1, label: "A1", isSelected: false },
{ id: 2, label: "A2", isSelected: true },
{ id: 3, label: "A3", isSelected: false },
{ id: 4, label: "B1", isSelected: false },
{ id: 5, label: "B2", isSelected: false }
]
}
]
},
{
id: 237633,
date: new Date("2026-03-22"),
events: [
{
id: 7843689,
title: "Rock Concert",
seats: [
{ id: 1, label: "1a", isSelected: true },
{ id: 2, label: "1b", isSelected: false },
{ id: 3, label: "1c", isSelected: true },
{ id: 4, label: "2a", isSelected: false }
]
}
]
},
{
id: 237634,
date: new Date("2026-03-23"),
events: [
{
id: 7843690,
title: "Magic Show",
seats: [
{ id: 1, label: "Front 1", isSelected: false },
{ id: 2, label: "Front 2", isSelected: false },
{ id: 3, label: "Front 3", isSelected: true },
{ id: 4, label: "Back 1", isSelected: false }
]
},
{
id: 7843691,
title: "Jazz Evening",
seats: [
{ id: 1, label: "VIP 1", isSelected: true },
{ id: 2, label: "VIP 2", isSelected: true },
{ id: 3, label: "VIP 3", isSelected: false }
]
}
]
}
];
