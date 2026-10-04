const readline = require("readline");

function askQuestion(promptText) {
    if (typeof prompt === "function") {
        return Promise.resolve(prompt(promptText));
    }

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(promptText, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

function showMessage(message) {
    if (typeof alert === "function") {
        alert(message);
        return;
    }

    console.log(message);
}

async function main() {
    const userString = await askQuestion("Enter a word or phrase: ");

    if (userString === null || userString === "") {
        console.log("No input provided. Exiting program.");
        return;
    }

    console.log(`Your text: "${userString}"`);
    console.log(`Length: ${userString.length} characters (Valid positions: 1 to ${userString.length})`);

    let querying = true;

    while (querying) {
        const input = await askQuestion(`Enter a position to check (1 - ${userString.length}) or type 'exit' to quit: `);

        if (input === null || input.trim().toLowerCase() === "exit") {
            querying = false;
            console.log("Exiting query mode.");
            break;
        }

        const position = parseInt(input, 10);

        if (Number.isNaN(position) || position < 1 || position > userString.length) {
            showMessage(`Invalid input. Please enter a number between 1 and ${userString.length}.`);
        } else {
            const character = userString.charAt(position - 1);
            const displayChar = character === " " ? "[Space]" : character;

            showMessage(`The character at position ${position} is: ${displayChar}`);
            console.log(`Query: Position ${position} -> ${displayChar}`);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
