# PDF Demo Parser

A Node.js application that extracts text from demo training PDF files, combines them with event scheduling data from Excel, and provides a React viewer for displaying the combined information.

## Features

- Extracts text content from PDF files using `pdf-parse`
- Parses structured demo data (products, talking points, materials)
- Combines PDF data with Excel event scheduling information
- React-based viewer with accordion interface
- Saves extracted and combined data as JSON files

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Place PDF files and Excel scheduling file in the `input/` directory

3. Extract PDF content:
   ```bash
   npm start
   ```

4. Combine with Excel event data:
   ```bash
   npm run combine
   ```

5. Run the viewer:
   ```bash
   cd viewer
   npm install
   npm run dev
   ```

## File Structure

```
/input              ← Place PDF files and Excel files here
/output             ← JSON files will be saved here
/viewer             ← React viewer application
  /public/data      ← JSON data files for viewer
  /src              ← React components
extract.js          ← PDF extraction script
combine-data.js     ← Excel/PDF combination script
package.json        ← Node.js dependencies
```

## Output Format

Each processed PDF generates a JSON file containing:

```json
{
  "filename": "example.pdf",
  "processed_at": "2024-01-15T10:30:00.000Z",
  "text": "Extracted text content...",
  "text_length": 1234,
  "parsed_data": {
    "demo_type": "Product Demo",
    "products": { "featured": [...], "alternate": [...] },
    "talking_points": [...],
    "required_materials": {...}
  },
  "scheduled_events": [
    {
      "Job #": 1234,
      "Project Name": "Demo Name",
      "Store Name": "Store",
      "Project Date": "2025-01-15",
      "Project Time": "10AM-2PM",
      "Demonstrator Name": "Name"
    }
  ]
}
```

## Requirements

- Node.js >= 12.0.0
- PDF files in the `input/` directory
