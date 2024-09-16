import DebouncedApiCall from "./DebouncedApiCall ";
import Debounce_In_Purejs from "./Debounce_In_Purejs";
import "./styles.css";
import ThrottledApiCall from "./ThrottledApiCall ";
import Throttle_In_Purejs from "./Throttle_In_Purejs";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <DebouncedApiCall /> */}
      {/* <ThrottledApiCall /> */}
      {/* <Throttle_In_Purejs /> */}
      <Debounce_In_Purejs />
    </div>
  );
}
