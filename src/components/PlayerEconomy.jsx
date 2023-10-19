import React, { useEffect, useState } from "react";

const PlayerEconomy = () => {
  //fetching from FTP of exact file
  //   const response = await fetch(
  //     "http://209.192.230.164:28162/fs/server-data/Lua/timestamp_economy.log",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Basic " + btoa("uAIlqSG72NJL:YZBIEItgslZb"),
  //         "Cache-Control": "no-cache",
  //       },
  //     }
  //   );
  //   const ftpData = await response.text();

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

  //steps
  const parseLogString = (logString) => {
    let logArray = logString.trim().split("\n");
    return logArray;
  };
  const logArray = parseLogString(ftpData);

  //steps
  const pattern = /Deposit: (.*?) oldBalance: Coin: (\d+)/;
  const nameBalances = {};

  logArray.forEach((entry) => {
    const match = entry.match(pattern);
    if (match) {
      const name = match[1];
      const newBalance = parseInt(match[2]);

      if (name in nameBalances) {
        nameBalances[name] = newBalance;
      } else {
        nameBalances[name] = newBalance;
      }
    }
  });
  const sortedItems = Object.entries(nameBalances).sort((a, b) => b[1] - a[1]);

  //steps
  const usersJson = JSON.stringify(
    sortedItems.reduce((acc, [name, newBalance]) => {
      acc[name] = newBalance;
      return acc;
    }, {}),
    null,
    2
  );
  const users = JSON.parse(usersJson);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(users).map((user) => (
            <tr key={user}>
              <td>{user}</td>
              <td>{users[user]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PlayerEconomy;
