import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:80/api/minerDetails");

      setData(res.data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  //console.log(data);
  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};
