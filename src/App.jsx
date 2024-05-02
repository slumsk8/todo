import "./App.css";
import Parse from "parse/dist/parse.min.js";
import { TodoComponent } from "./TodoComponent";

const PARSE_APPLICATION_ID = "W7jSq9RZ02wTM0SEsDs9lC02y19AiklvSwtEG6rN";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "3M7NCi3N519r5ZvnlBU8f10YRZzIYOXmZ3RoocVr";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <div className="container_app">
      <TodoComponent />
    </div>
  )
}

export default App;
