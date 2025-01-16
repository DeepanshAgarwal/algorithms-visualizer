import React, {
    useEffect,
    useContext,
    useCallback,
    useState,
    useRef,
} from "react";
import Bar from "./Bar";
import { generateArray, bubbleSort, shuffleArray } from "../lib/sortUtils";
import { SortContext } from "../contexts/SortContext";

const GraphContainer = () => {
    const [array, setArray] = useState([]);
    const [compared, setCompared] = useState([]);
    const [final, setFinal] = useState([]);
    const {
        setSortFunction,
        setShuffleFunction,
        sorting,
        setSorting,
        paused,
        setPaused,
        stopped,
        setStopped,
    } = useContext(SortContext);

    const pausedRef = useRef(paused);
    const stoppedRef = useRef(stopped);

    useEffect(() => {
        pausedRef.current = paused;
        stoppedRef.current = stopped;
    }, [paused, stopped]);

    useEffect(() => {
        setArray(generateArray());
    }, []);

    const handleBubbleSort = useCallback(() => {
        bubbleSort(
            array,
            setArray,
            setSorting,
            pausedRef,
            stoppedRef,
            setCompared,
            setFinal
        );
    }, [array]);

    const handleShuffleArray = useCallback(() => {
        setPaused(false);
        setStopped(true);
        setTimeout(() => {
            shuffleArray(array, setArray, setPaused, setSorting, setFinal);
            setStopped(false);
        }, 100);
    }, [array]);

    const handlePause = () => {
        setPaused((prevPaused) => !prevPaused);
    };

    useEffect(() => {
        setSortFunction(() => handleBubbleSort);
        setShuffleFunction(() => handleShuffleArray);
    }, [
        setSortFunction,
        setShuffleFunction,
        handleBubbleSort,
        handleShuffleArray,
    ]);

    return (
        <div className="flex flex-col items-center justify-center h-[80%] w-[80%] bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-end justify-between h-full w-full">
                {array.map((value, index) => (
                    <Bar
                        key={index}
                        height={value}
                        color={
                            final.includes(index)
                                ? "bg-green-500"
                                : compared.includes(index)
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }
                    />
                ))}
            </div>
            <div className="bg-black w-full h-[2px]"></div>
            <button
                onClick={handlePause}
                className={`mt-4 px-4 py-2 rounded ${
                    sorting
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-gray-300"
                }`}
                disabled={!sorting}
            >
                {paused ? "Resume" : "Pause"}
            </button>
        </div>
    );
};

export default GraphContainer;
