function bubbleSort(arr) {
    let n = arr.length;

    // Outer loop for all elements
    for (let i = 0; i < n - 1; i++) {
        // Inner loop for comparison
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap if the current element is greater than the next
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return arr;
}

// Example usage
let array = [64, 34, 25, 12, 22, 11, 90];
console.log("Unsorted Array:", array);

let sortedArray = bubbleSort(array);
console.log("Sorted Array:", sortedArray);
