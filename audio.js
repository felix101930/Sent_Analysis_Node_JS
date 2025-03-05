import dotenv from 'dotenv'
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Wrap the code in an async function
async function processAudio() {
    const fileManager = new GoogleAIFileManager(process.env.API_KEY);
    const mediaPath = "./audio"
    const uploadResult = await fileManager.uploadFile(
        `${mediaPath}/crowd_noise.mp3`,
        {
            mimeType: "audio/mp3",
            displayName: "Audio sample",
        }
    );

    let file = await fileManager.getFile(uploadResult.file.name);
    while (file.state === FileState.PROCESSING) {
        process.stdout.write(".");
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        file = await fileManager.getFile(uploadResult.file.name);
    }

    if (file.state === FileState.FAILED) {
        throw new Error("Audio processing failed.");
    }

    console.log(
        `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
    );

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent([
        "Tell me about this audio clip then State the timestamps of when you here distinct elements",
        {
            fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType,
            },
        }
    ]);
    console.log(result.response.text());
}

// Call the async function
processAudio().catch(console.error);
