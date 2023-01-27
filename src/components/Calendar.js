import React from "react";

import { Calendar as FullCalendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

const googleCalendarApiKey = "AIzaSyCzWol4EXLrlxgi1vUrPzOsTkUUiM17Bg4";
const googleCalendarId =
  "5b12486f81386n127b9da1dc1830a758a1c6590d112b6d4e1b97aca6d04c96d0f@group.calendar.google.com";
const googleOAuthClientId =
  "676890687623-8s3fvm9pg5c67om74rfvekqefaeppasu.apps.googleusercontent.com";

const plugins = [googleCalendarPlugin, interactionPlugin, dayGridPlugin];

export function Calendar() {
  const calendarRef = React.useRef(null);

  // Initalize FullCalendar
  const [googleCalendar, setGoogleCalendar] = React.useState(null);
  React.useEffect(() => {
    if (calendarRef.current === null || googleCalendar !== null) {
      return;
    }

    const calendar = new FullCalendar(calendarRef.current, {
      plugins,
      googleCalendarApiKey,
      initialView: "dayGridMonth",
      events: {
        googleCalendarId,
        className: "gcal-event", // an option!
      },
    });

    calendar.render();

    setGoogleCalendar(calendar);
  }, [calendarRef, googleCalendar]);

  console.log("googleCalendar", googleCalendar);
  return <div ref={calendarRef}></div>;
}
