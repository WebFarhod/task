import React, { useRef, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import InputMask from "react-input-mask";
import "./App.css";

interface IResult {
  email: string;
  number: string;
}
const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("t", cancelTokenRef.current);
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("Operation canceled due to new request.");
      }

      cancelTokenRef.current = axios.CancelToken.source();

      const response = await axios.post(
        "http://localhost:3000/search",
        {
          email,
          number: number.replace(/-/g, "").replace(/_/g, ""),
        },
        {
          cancelToken: cancelTokenRef.current.token,
        }
      );
      setResults(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
      cancelTokenRef.current = null;
    }
  };

  return (
    <div className="app">
      <h1>Search Users</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Email:</label>
          <input
            className="input-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-div">
          <label>Number:</label>
          <InputMask
            className="input-text"
            mask="99-99-99"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {loading && <div className="loader"></div>}
      <h2>Results:</h2>
      {results.length > 0 ? (
        <div className="results">
          <ul>
            {results.map((result: IResult, index) => (
              <li key={index}>
                Email: {result.email}, Number: {result.number}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>No data</h3>
      )}
    </div>
  );
};

export default App;
