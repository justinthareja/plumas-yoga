import React from "react";

import { Calendar as FullCalendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import { useIsMobile } from "../hooks";

const googleCalendarApiKey = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
const googleCalendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID;

const plugins = [
  googleCalendarPlugin,
  interactionPlugin,
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
];

export function Calendar() {
  const calendarRef = React.useRef(null);
  const [calendar, setCalendar] = React.useState(null);
  const isMobile = useIsMobile();

  // Initalize FullCalendar
  React.useEffect(() => {
    if (calendar !== null) {
      return;
    }

    const fullCalendar = new FullCalendar(calendarRef.current, {
      plugins,
      googleCalendarApiKey,
      events: {
        googleCalendarId,
        className: "gcal-event", // an option!
      },
      eventClick: handleEventClick,

      initialView: isMobile ? "listMonth" : "dayGridMonth",
      headerToolbar: isMobile
        ? {
            left: "prev,next",
            center: "",
            right: "title",
          }
        : {
            left: "today prev,next",
            center: "title",
            right: "timeGridWeek,dayGridMonth,listWeek",
          },
      height: "auto",
      buttonText: {
        list: "agenda",
      },
    });

    fullCalendar.render();

    setCalendar(fullCalendar);

    // import overrides AFTER fullcalendar's stylesheet is loaded to maintain precedence
    require("./Calendar.css");
  }, [calendar, isMobile]);

  // Change view when screen size updates
  React.useEffect(() => {
    if (calendar === null) {
      return;
    }

    if (isMobile && calendar.view.type !== "listMonth") {
      calendar.setOption("headerToolbar", {
        left: "prev,next",
        center: "",
        right: "title",
      });
      calendar.changeView("listMonth");
    }

    if (!isMobile && calendar.view.type !== "dayGridMonth") {
      calendar.setOption("headerToolbar", {
        left: "today prev,next",
        center: "title",
        right: "timeGridWeek,dayGridMonth,listWeek",
      });
      calendar.changeView("dayGridMonth");
    }
  }, [isMobile, calendar]);

  function handleEventClick(info) {
    // TODO: Show description popup
    info.jsEvent.preventDefault(); // don't let the browser navigate

    if (info.event.url) {
      window.open(info.event.url);
    }
  }

  return <div ref={calendarRef}></div>;
}
