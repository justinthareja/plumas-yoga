import "./App.css";
import { Calendar } from "./components";

function App() {
  return (
    <div className="calendar">
      <Calendar />
      {/* TODO: Find a more elegant solution for this:
      https://support.google.com/calendar/thread/167345067?hl=en */}
      <p>
        Can't see the calendar?{" "}
        <a href="https://calendar.google.com/calendar/embed?src=5b12486f81386127b9da1dc1830a758a1c6590d112b6d4e1b97aca6d04c96d0f%40group.calendar.google.com&ctz=America%2FLos_Angeles">
          Click here
        </a>
      </p>
    </div>
  );
}

export default App;
