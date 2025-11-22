const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // For listing models, we might need to use the model manager if exposed, 
        // but the SDK usually doesn't expose a direct listModels on the main class easily in all versions.
        // Actually, the error message suggests calling ListModels. 
        // In the Node SDK, it's often on the GenerativeModel or via a specific manager.
        // Let's try to just use a known stable model to test, or try to find the correct name.
        // But wait, the SDK *does* have a getGenerativeModel.

        // Let's try to use the API directly to list models if the SDK doesn't make it obvious,
        // but actually, let's just try 'gemini-1.5-flash-001' which is the specific version.
        // Or 'gemini-1.5-pro'.

        // However, to be sure, let's try to fetch the model list.
        // Since I can't easily browse the docs right now, I will try to update to 'gemini-1.5-flash-001' first
        // as that is the most likely culprit (version suffix).

        console.log("Testing model names...");

        const modelNames = [
            "gemini-2.0-flash",
            "gemini-1.5-flash-001",
            "gemini-1.5-flash-latest",
            "gemini-1.5-flash",
            "gemini-pro"
        ];

        for (const name of modelNames) {
            console.log(`Trying model: ${name}`);
            try {
                const model = genAI.getGenerativeModel({ model: name });
                const result = await model.generateContent("Hello");
                console.log(`SUCCESS: ${name} works!`);
                return; // Found one
            } catch (e) {
                console.log(`FAILED: ${name} - ${e.message.split('\n')[0]}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
