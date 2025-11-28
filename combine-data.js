const fs = require('fs');
const XLSX = require('xlsx');

// Read the Excel file
const workbook = XLSX.readFile('input/Event-Dates.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const excelData = XLSX.utils.sheet_to_json(sheet);

// Convert Excel date numbers to readable dates
function excelDateToJSDate(excelDate) {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Read all JSON files from output directory
const outputFiles = fs.readdirSync('output')
  .filter(file => file.endsWith('.json'));

// Create a mapping between project names and JSON files
const projectMapping = {
  'Bar-S Deli': 'Bar S Demo Training Manual.json',
  'CMAB Joseph Farms @ Food 4 Less-11/21/2025': 'CMAB 8150054_TM (1).json',
  'Nature\'s Fynd Cooking': 'Fynd-Wedjan17.json',
  'Beyond Good Chocolate': ['1529459.json', '1529469.json']
};

// Group Excel data by project
const eventsByProject = {};
excelData.forEach(event => {
  const projectName = event['Project Name'];
  if (!eventsByProject[projectName]) {
    eventsByProject[projectName] = [];
  }

  // Convert Excel date to readable format
  event['Project Date'] = excelDateToJSDate(event['Project Date']);

  eventsByProject[projectName].push(event);
});

// Combine data for each project
const combinedData = {};

Object.keys(projectMapping).forEach(projectName => {
  const jsonFiles = Array.isArray(projectMapping[projectName])
    ? projectMapping[projectName]
    : [projectMapping[projectName]];

  jsonFiles.forEach(jsonFile => {
    const filePath = `output/${jsonFile}`;

    if (fs.existsSync(filePath)) {
      const demoData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Add event scheduling data to the demo data
      const combined = {
        ...demoData,
        scheduled_events: eventsByProject[projectName] || []
      };

      // Save combined data
      fs.writeFileSync(filePath, JSON.stringify(combined, null, 2));
      console.log(`✓ Updated ${jsonFile} with ${(eventsByProject[projectName] || []).length} scheduled events`);
    }
  });
});

console.log('\n✓ All files updated with event scheduling data');
