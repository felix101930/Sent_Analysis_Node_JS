const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline")
const dotenv = require("dotenv")
dotenv.config()
const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


userInterface.prompt()

userInterface.on("line",async (input) => {
// do main
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const result = await model.generateContentStream([input]);

for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
}

// console.log(result.response.text());

// userInterface.prompt();
})
