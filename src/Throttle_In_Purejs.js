import React, { useState, useRef } from "react";
import axios from "axios";

const Throttle_In_Purejs = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Throttle logic using useRef to store the last execution time
  const lastCallTime = useRef(0);

  const throttle = (func, limit) => {
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCallTime.current >= limit) {
        lastCallTime.current = now;
        func(...args);
      }
    };
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setData(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  // Throttled version of fetchData (only allows one call every 5 seconds)
  const throttledFetchData = throttle(fetchData, 5000);

  return (
    <div className="app">
      <h1>Throttled API Call Example (Pure JS)</h1>

      <button onClick={throttledFetchData} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Data"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {data && (
          <ul>
            {data.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Throttle_In_Purejs;
