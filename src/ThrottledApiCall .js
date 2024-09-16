import React, { useState, useCallback } from "react";
import axios from "axios";
import { throttle } from "lodash";

const ThrottledApiCall = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Throttled function to call the API, limited to one request per 5 seconds (5000ms)
  const fetchData = useCallback(
    throttle(async () => {
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
    }, 5000),
    []
  ); // Empty dependency array to keep the throttled function consistent across renders

  return (
    <div className="app">
      <h1>Throttled API Call Example</h1>

      <button onClick={fetchData} disabled={isLoading}>
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

export default ThrottledApiCall;
