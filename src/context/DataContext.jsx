import React, { createContext, useState } from "react";
import { jobData as initialJobData } from "../data/JobData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [jobData, setJobData] = useState(initialJobData);
  const [candidates, setCandidates] = useState([]);

  return (
    <DataContext.Provider value={{ jobData, setJobData, candidates, setCandidates }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
