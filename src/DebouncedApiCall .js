import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

const DebouncedApiCall = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced function to call the API
  const fetchData = debounce(async () => {
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
  }, 300); // 300ms debounce delay

  return (
    <div className="app">
      <h1>Debounced API Call Example</h1>

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

export default DebouncedApiCall;
