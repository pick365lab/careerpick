const fs = require('fs');
const path = require('path');

// Load env vars manually since we're running a standalone script
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
    const lineTrimmed = line.trim();
    if (!lineTrimmed || lineTrimmed.startsWith('#')) return acc;

    const firstEquals = line.indexOf('=');
    if (firstEquals > -1) {
        const key = line.substring(0, firstEquals).trim();
        let value = line.substring(firstEquals + 1).trim();
        // Remove surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        acc[key] = value;
    }
    return acc;
}, {});

console.log("Found keys in .env.local:", Object.keys(envVars));

const API_KEY = envVars.GOOGLE_API_KEY;

if (!API_KEY) {
    console.error("Error: GOOGLE_API_KEY not found in .env.local");
    process.exit(1);
}

console.log("Found API Key:", API_KEY.substring(0, 5) + "...");

async function run() {
    try {
        console.log("Testing with raw REST API...");
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:");
            console.error(JSON.stringify(data, null, 2));
        } else {
            console.log("Successfully listed models:");
            const models = data.models?.map(m => m.name) || [];
            console.log(models);

            if (models.length > 0) {
                console.log("\nTrying generation with gemini-1.5-flash...");
                // Note: The model name in the list usually starts with "models/"
                // We need to be careful about how we construct the URL.
                // If the user wants "gemini-1.5-flash", let's try that specific string first if it's not in the list.

                const modelName = "gemini-1.5-flash";
                const genUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

                console.log(`POST to ${genUrl}`);

                const genResponse = await fetch(genUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: "Hello" }] }]
                    })
                });
                const genData = await genResponse.json();
                console.log("Generation response:", JSON.stringify(genData, null, 2));
            }
        }

    } catch (error) {
        console.error("\nError testing Gemini API:");
        console.error(error);
    }
}

run();
