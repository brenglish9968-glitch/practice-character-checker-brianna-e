// Prompt the user for the initial word or phrase
const userString = prompt("Enter a word or phrase:");

if (userString === null || userString === "") {
    console.log("No input provided. Exiting program.");
} else {
    console.log(`Your text: "${userString}"`);
    console.log(`Length: ${userString.length} characters (Valid positions: 1 to ${userString.length})`);
    
    let querying = true;

    while (querying) {
        // Prompt for the position (1-indexed for better user experience)
        const input = prompt(`Enter a position to check (1 - ${userString.length}) or type 'exit' to quit:`);

        // Check if user wants to exit
        if (input === null || input.toLowerCase() === 'exit') {
            querying = false;
            console.log("Exiting query mode.");
            break;
        }

        // Convert input to an integer
        const position = parseInt(input, 10);

        // Validate the input and check boundaries
        if (isNaN(position) || position < 1 || position > userString.length) {
            alert(`Invalid input. Please enter a number between 1 and ${userString.length}.`);
        } else {
            // JavaScript strings are 0-indexed, so we subtract 1 from the user's input
            const character = userString.charAt(position - 1);
            
            // Handle spaces visually so the user knows it's a valid character
            const displayChar = character === " " ? "[Space]" : character;
            
            alert(`The character at position ${position} is: ${displayChar}`);
            console.log(`Query: Position ${position} -> ${displayChar}`);
        }
    }
}