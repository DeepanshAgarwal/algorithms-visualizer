const generateArray = () => {
    const array = Array.from({ length: 100 }, (_, i) => i + 1);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Create a single AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.1; // Adjust the gain to make the sounds slightly louder
gainNode.connect(audioContext.destination);

const playSound = (frequency = 150, type = "sine") => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
};

const bubbleSort = async (
    array,
    setArray,
    setSorting,
    pausedRef,
    stoppedRef,
    setCompared,
    setFinal
) => {
    let arr = [...array];
    setSorting(true);
    const waveforms = ["sine", "triangle"];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (stoppedRef.current) {
                setSorting(false);
                return;
            }
            setCompared([j, j + 1]);
            const waveform = waveforms[j % waveforms.length];
            playSound(80 + arr[j], waveform); // Use lower frequencies for duller sounds
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, 10));
                while (pausedRef.current) {
                    await new Promise((resolve) => setTimeout(resolve, 10));
                }
            }
        }
        setFinal((prevFinal) => [...prevFinal, arr.length - i - 1]);
    }
    setSorting(false);
    setCompared([]);

    // Traverse through all bars again and change their color back to normal
    for (let i = 0; i < arr.length; i++) {
        setFinal((prevFinal) => prevFinal.filter((index) => index !== i));
        playSound(150 + arr[i], "sine"); // Play sound as the bars change color back to normal
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
};

const shuffleArray = (array, setArray, setPaused, setSorting, setFinal) => {
    let shuffledArray = [...array].sort(() => Math.random() - 0.5);
    setArray(shuffledArray);
    setPaused(false);
    setSorting(false);
    setFinal([]);
};

export { generateArray, bubbleSort, shuffleArray };
