# PDF Demo Parser

A Node.js script that extracts text from PDF files and saves the results as JSON files.

## Features

- Extracts text content from PDF files using `pdf-parse`
- Processes all PDF files in the `input/` directory
- Saves extracted text as JSON files in the `output/` directory
- Each JSON file includes metadata like filename, processing timestamp, and text length

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Place PDF files in the `input/` directory

3. Run the extraction script:
   ```bash
   npm start
   # or
   node extract.js
   ```

## File Structure

```
/input         ← Place PDF files here
/output        ← JSON files will be saved here
extract.js     ← Main extraction script
package.json   ← Node.js dependencies
.env.example   ← Environment configuration template
```

## Output Format

Each processed PDF generates a JSON file with the same name containing:

```json
{
  "filename": "example.pdf",
  "processed_at": "2024-01-15T10:30:00.000Z",
  "text": "Extracted text content from the PDF...",
  "text_length": 1234
}
```

## Requirements

- Node.js >= 12.0.0
- PDF files in the `input/` directory
