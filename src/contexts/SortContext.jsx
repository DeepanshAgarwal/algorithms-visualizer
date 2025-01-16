import React, { createContext, useState } from "react";

export const SortContext = createContext(); // Correctly creating the context

export const SortProvider = ({ children }) => {
    const [sortFunction, setSortFunction] = useState(null);
    const [shuffleFunction, setShuffleFunction] = useState(null);
    const [sorting, setSorting] = useState(false);
    const [paused, setPaused] = useState(false);
    const [stopped, setStopped] = useState(false);

    return (
        <SortContext.Provider
            value={{
                sortFunction,
                setSortFunction,
                shuffleFunction,
                setShuffleFunction,
                sorting,
                setSorting,
                paused,
                setPaused,
                stopped,
                setStopped,
            }}
        >
            {children}
        </SortContext.Provider>
    );
};
