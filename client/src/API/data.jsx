import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const res = await axios.get("Backend Route to DB");
            setData(await res.Json());
        }catch(error){
            console.log("Error fetching data", error);
        }
    };

  return (
    <DataProvider.Provider value={{data}}>
        {children}
    </DataProvider.Provider>
  );
}



    


export default data