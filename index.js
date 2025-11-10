import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import puppeteer from 'puppeteer'; // Use Puppeteer

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5500;

// --- Middleware ---
app.use(cors()); 

// This is CRITICAL: It reads the HTML body from the client
app.use(express.text({ type: 'text/html', limit: '10mb' })); 

// Serves static files (CSS, JS, assets)
app.use(express.static(__dirname));

// --- Page Routes ---
app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/add", (_, res) => {
    res.sendFile(path.join(__dirname, "add.html"));
});
app.get("/compare", (_, res) => {
    res.sendFile(path.join(__dirname, "compare.html")); 
});

// --- NEW API Route (using Puppeteer) ---
app.post('/api/export-pdf', async (req, res) => {
  console.log("Received PDF request for /api/export-pdf");

  // Get the HTML string from the client
  const html = req.body; 

  if (!html) {
    console.error("PDF Error: No HTML content provided.");
    return res.status(400).send("No HTML content provided");
  }

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content
    // We wait until all network requests (like fonts) are loaded
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate the PDF
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Ensures backgrounds are printed
      margin: { // 👈 ✅ ADD THIS OBJECT
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    await browser.close(); 

    // Send the PDF back to the client
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=summary.pdf");
    res.end(buffer);

  } catch (err) {
    console.error("❌ PDF error (Puppeteer):", err);
    res.status(500).send("PDF generation failed");
  }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});