import "./App.css";
import Parse from "parse/dist/parse.min.js";
import { TodoComponent } from "./TodoComponent";


Parse.initialize(
  'qdNg7zrN6q825KCSYAummzyPa6TqDqYRH79QzJjY',
  'PuzuTl6Keu11A296pEc7ZnvGqAveIpOhAHcICQmM'
);
Parse.serverURL = 'https://parseapi.back4app.com/';

function App() {    
  return (
    <div className="container_app">
      <TodoComponent />
    </div>
  );
}

export default App;
