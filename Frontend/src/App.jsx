import Register from "./Register";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  return <Register />;
}

export default App;
