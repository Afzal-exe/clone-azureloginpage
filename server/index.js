import express from "express";
import fs from "fs/promises";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000; // Use Azure-assigned port or fallback to 5000

// Middleware
app.use(cors());
app.use(express.json());

// Define the path for storing credentials
const credsFilePath = process.env.CREDENTIALS_PATH || path.resolve("server/credentials.json");

// Helper function to read existing credentials
const readCredentials = async () => {
  try {
    const data = await fs.readFile(credsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return []; // Return empty array if file doesn't exist or is empty
  }
};

// API Route to Save Credentials
app.post("/save-credentials", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const creds = await readCredentials();
    creds.push({ email, password });

    await fs.writeFile(credsFilePath, JSON.stringify(creds, null, 2));
    res.status(200).json({ message: "Credentials saved successfully!" });
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).json({ error: "Failed to save credentials." });
  }
});

// Root Route (For Azure Health Check)
app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
