import * as pdf from "html-pdf-node";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  
  // ✅ ADD THESE LINES
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all origins
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  // ✅ END OF ADDED LINES

  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  let html = "";
  for await (const chunk of req) {
    html += chunk;
  }

  const file = { content: html };
  const options = { format: "A4" };

  try {
    const buffer = await pdf.generatePdf(file, options);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=summary.pdf");
    res.end(buffer);
  } catch (err) {
    console.error("❌ PDF error:", err);
    res.status(500).send("PDF generation failed");
  }
}
