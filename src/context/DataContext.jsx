import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [mainData, setMainData] = useState({ headers: [], data: [] });
    const [inclusionData, setInclusionData] = useState({ headers: [], data: [] });
    const [exclusionData, setExclusionData] = useState({ headers: [], data: [] });

    return (
        <DataContext.Provider value={{
            mainData, setMainData,
            inclusionData, setInclusionData,
            exclusionData, setExclusionData
        }}>
            {children}
        </DataContext.Provider>
    );
}
