import React from "react";

import { Calendar as FullCalendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

const googleCalendarApiKey = "AIzaSyCzWol4EXLrlxgi1vUrPzOsTkUUiM17Bg4";
const googleCalendarId =
  "5b12486f81386127b9da1dc1830a758a1c6590d112b6d4e1b97aca6d04c96d0f@group.calendar.google.com";

const plugins = [
  googleCalendarPlugin,
  interactionPlugin,
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
];

export function Calendar() {
  const calendarRef = React.useRef(null);
  const [googleCalendar, setGoogleCalendar] = React.useState(null);

  // Initalize FullCalendar
  React.useEffect(() => {
    if (calendarRef.current === null || googleCalendar !== null) {
      return;
    }

    const calendar = new FullCalendar(calendarRef.current, {
      plugins,
      googleCalendarApiKey,
      events: {
        googleCalendarId,
        className: "gcal-event", // an option!
      },
      eventClick: handleEventClick,
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "today prev,next",
        center: "title",
        right: "timeGridWeek,dayGridMonth,listWeek",
      },
      buttonText: {
        list: "agenda",
      },
    });

    calendar.render();

    setGoogleCalendar(calendar);
  }, [calendarRef, googleCalendar]);

  function handleEventClick(info) {
    info.jsEvent.preventDefault(); // don't let the browser navigate

    if (info.event.url) {
      window.open(info.event.url);
    }
  }

  return <div ref={calendarRef}></div>;
}
