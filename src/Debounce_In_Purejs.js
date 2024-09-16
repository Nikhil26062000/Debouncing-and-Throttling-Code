import React, { useState, useRef } from "react";
import axios from "axios";

const Debounce_In_Purejs = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce logic using useRef to store the timeout ID
  const debounceTimeout = useRef(null);

  const debounce = (func, delay) => {
    return function (...args) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        func(...args);
      }, delay);
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

  // Debounced version of fetchData (calls only after user stops clicking for 2 seconds)
  const debouncedFetchData = debounce(fetchData, 2000);

  return (
    <div className="app">
      <h1>Debounced API Call Example (Pure JS)</h1>

      <button onClick={debouncedFetchData} disabled={isLoading}>
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

export default Debounce_In_Purejs;
