const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const inputDir = './input';
const outputDir = './output';

async function extractTextFromPDF(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

async function processPDFFiles() {
  try {
    // Check if input directory exists
    if (!fs.existsSync(inputDir)) {
      console.error('Input directory does not exist:', inputDir);
      return;
    }

    // Check if output directory exists, create if not
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Read all files from input directory
    const files = fs.readdirSync(inputDir);
    const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');

    if (pdfFiles.length === 0) {
      console.log('No PDF files found in input directory');
      return;
    }

    console.log(`Found ${pdfFiles.length} PDF file(s). Processing...`);

    for (const pdfFile of pdfFiles) {
      try {
        console.log(`Processing: ${pdfFile}`);
        const pdfPath = path.join(inputDir, pdfFile);
        const text = await extractTextFromPDF(pdfPath);

        // Create JSON output
        const jsonData = {
          filename: pdfFile,
          processed_at: new Date().toISOString(),
          text: text.trim(),
          text_length: text.trim().length
        };

        // Save to output directory with same name (changing extension to .json)
        const jsonFilename = pdfFile.replace(/\.pdf$/i, '.json');
        const jsonPath = path.join(outputDir, jsonFilename);
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));

        console.log(`Saved: ${jsonFilename}`);
      } catch (error) {
        console.error(`Error processing ${pdfFile}:`, error.message);
      }
    }

    console.log('Processing complete!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
processPDFFiles();
