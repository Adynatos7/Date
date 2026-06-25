const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "responses.json");
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "secret-token-123";

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

function readResponses() {
  try {
    const content = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

function writeResponses(responses) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2), "utf8");
}

app.post("/api/submit", (req, res) => {
  const { activity, time, food, date, answer } = req.body;
  if (!answer || (answer !== "oui" && answer !== "non")) {
    return res.status(400).json({ error: "Réponse invalide." });
  }

  const responses = readResponses();
  const item = {
    id: crypto.randomUUID(),
    answer,
    activity: activity || "",
    time: time || "",
    food: food || "",
    date: date || "",
    createdAt: new Date().toISOString(),
  };
  responses.push(item);
  writeResponses(responses);
  res.json({ success: true });
});

app.get("/api/admin/responses", (req, res) => {
  const token = req.headers["x-admin-token"];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Non autorisé." });
  }
  const responses = readResponses();
  res.json(responses);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Admin token: ${ADMIN_TOKEN}`);
});
