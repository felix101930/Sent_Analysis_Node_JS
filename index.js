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

const result = await model.generateContent(input);
console.log(result.response.text());

userInterface.prompt();
})
// async function main() {
//   const genAI = new GoogleGenerativeAI("AIzaSyAinr9sp2nvFKw-_YWnuhba4cgdoXFHDHg");
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = "Explain how AI works";

//   const result = await model.generateContent(prompt);
//   console.log(result.response.text());
// }

// main().catch(console.error);
