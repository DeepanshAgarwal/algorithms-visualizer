import React, { useState } from "react";
import GraphContainer from "./components/GraphContainer";
import NavBar from "./components/NavBar";
import { SortProvider } from "./contexts/SortContext";

const App = () => {
    return (
        <SortProvider>
            <NavBar />
            <div className="flex items-center justify-center h-[calc(100vh-4rem)] w-full bg-gray-200">
                <GraphContainer />
            </div>
        </SortProvider>
    );
};

export default App;
