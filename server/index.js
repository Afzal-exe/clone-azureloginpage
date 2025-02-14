import express from "express";
import fs from "fs/promises";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the server can find the credentials file correctly
const credsFilePath = path.join(__dirname, "credentials.json");

// Middleware
app.use(cors());
app.use(express.json());

// Ensure credentials file exists
const ensureCredsFile = async () => {
  try {
    await fs.access(credsFilePath);
  } catch (error) {
    await fs.writeFile(credsFilePath, "[]"); // Create empty array if file doesn't exist
  }
};

// Read existing credentials
const readCredentials = async () => {
  try {
    const data = await fs.readFile(credsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// API Route to Save Credentials
app.post("/save-credentials", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    await ensureCredsFile();
    const creds = await readCredentials();
    creds.push({ email, password });

    await fs.writeFile(credsFilePath, JSON.stringify(creds, null, 2));
    res.status(200).json({ message: "Credentials saved successfully!" });
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).json({ error: "Failed to save credentials." });
  }
});

// Start the server and bind to 0.0.0.0 for external access
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  console.log(`Accessible via http://<your-vm-ip>:${PORT}`);
});
