import React, { useContext } from "react";
import { SortContext } from "../contexts/SortContext";

const NavBar = () => {
    const { sortFunction, shuffleFunction, sorting, paused } =
        useContext(SortContext);

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-lg font-bold">Bubble Sort Visualizer</h1>
            <div>
                <button
                    onClick={shuffleFunction}
                    className={`px-4 py-2 rounded mr-2 ${
                        sorting && !paused
                            ? "bg-gray-500 text-gray-300"
                            : "bg-blue-500 text-white"
                    }`}
                    disabled={sorting && !paused}
                >
                    Shuffle
                </button>
                <button
                    onClick={sortFunction}
                    className={`px-4 py-2 rounded ${
                        sorting
                            ? "bg-gray-500 text-gray-300"
                            : "bg-green-500 text-white"
                    }`}
                    disabled={sorting}
                >
                    Sort
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
