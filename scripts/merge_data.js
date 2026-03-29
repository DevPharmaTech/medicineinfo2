const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../data/medicines');
const outputFile = path.join(__dirname, '../data/merged_medicines.json');

async function mergeMedicines() {
    console.log('--- Merging Medicine Data ---');
    
    try {
        const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'));
        let allData = [];

        for (const file of files) {
            const raw = fs.readFileSync(path.join(inputDir, file), 'utf8');
            try {
                const data = JSON.parse(raw);
                if (Array.isArray(data)) {
                    allData = allData.concat(data);
                } else {
                    allData.push(data);
                }
                console.log(`Merged: ${file} (${Array.isArray(data) ? data.length : 1} records)`);
            } catch (e) {
                console.error(`Error parsing ${file}: ${e.message}`);
            }
        }

        // Clean data: Ensure no _id fields (only 'id')
        const cleanedData = allData.map(item => {
            const { _id, ...rest } = item;
            return rest;
        });

        // Unique by slug/id
        const uniqueData = [];
        const seen = new Set();
        cleanedData.forEach(item => {
            const key = item.slug || item.id;
            if (!seen.has(key)) {
                uniqueData.push(item);
                seen.add(key);
            }
        });

        fs.writeFileSync(outputFile, JSON.stringify(uniqueData, null, 2), 'utf8');
        console.log(`\nSUCCESS: Merged ${uniqueData.length} unique records into ${outputFile}`);
    } catch (error) {
        console.error(`Fatal error: ${error.message}`);
    }
}

mergeMedicines();
