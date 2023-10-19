import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PlayerEconomy from "./components/PlayerEconomy";

const App = () => {
  const [ftpData, setFtpData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001");
        if (response.ok) {
          const data = await response.text();
          setFtpData(data); // Update the state with the fetched data
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []); // The empty dependency array ensures the effect runs once on mount

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <PlayerEconomy />
    </>
  );
};

export default App;
