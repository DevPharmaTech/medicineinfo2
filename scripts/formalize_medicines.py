import argparse
import requests
import json
import time
import os
import re
import glob
import uuid
from datetime import datetime

# Configuration
API_URL = "http://localhost:11434/api/generate"
MODEL = "gemma:2b"
DELAY = 1  # seconds between requests

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9 ]', '', text)
    return text.replace(' ', '-')

def extract_json(text):
    """Robustly extract JSON from model response."""
    try:
        # Try to find JSON block
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        return json.loads(text)
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        print(f"Raw response: {text}")
        return None

def process_file(file_path, category=None):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    prompt = f"""
    Convert the following medicine information into a formal JSON object for a pharmaceutical directory.
    
    FIELDS REQUIRED:
    - id: A unique 24-character hex string (generate one if not provided)
    - slug: URL-friendly name (e.g., 'paracetamol')
    - name: Full generic/brand name
    - category: The category (e.g., '{category or 'General'}')
    - genericName: The active ingredient
    - manufacturer: Name of the pharmaceutical company
    - description: Comprehensive overview of use cases
    - dosages: Array of common dosage forms (e.g., ["500mg tablet", "250mg syrup"])
    - sideEffects: Array of common side effects
    - precautions: Safety warnings
    - imageUrl: Empty string ""
    - createdAt: Current ISO timestamp
    - updatedAt: Current ISO timestamp

    INPUT TEXT:
    {content}

    RESPONSE FORMAT: Strictly return ONLY valid JSON. No preamble or explanation.
    """

    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "format": "json"
    }

    print(f"Processing: {os.path.basename(file_path)}...")
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        
        medicine_json = extract_json(data.get('response', ''))
        if medicine_json:
            # Ensure essential fields
            if 'category' not in medicine_json or not medicine_json['category']:
                medicine_json['category'] = category or 'General'
            if 'id' not in medicine_json:
                medicine_json['id'] = uuid.uuid4().hex[:24]
            if 'createdAt' not in medicine_json:
                medicine_json['createdAt'] = datetime.utcnow().isoformat() + "Z"
            if 'updatedAt' not in medicine_json:
                medicine_json['updatedAt'] = medicine_json['createdAt']
            if 'slug' not in medicine_json:
                medicine_json['slug'] = slugify(medicine_json.get('name', 'medicine'))
            
            return medicine_json
    except Exception as e:
        print(f"Request failed: {e}")
    
    return None

def main():
    parser = argparse.ArgumentParser(description="Formalize medicine data using LLM API")
    parser.add_argument("--input", "-i", required=True, help="Input file or directory pattern (e.g. data/raw/*.txt)")
    parser.add_argument("--output", "-o", default="data/medicines", help="Output directory for JSON files")
    parser.add_argument("--category", "-c", help="Default category group (e.g. Analgesics)")
    parser.add_argument("--append", "-a", action="store_true", help="Append to existing category file if it exists")
    
    args = parser.parse_args()

    # Ensure output directory exists
    os.makedirs(args.output, exist_ok=True)

    # Handle file patterns
    files = glob.glob(args.input)
    if not files:
        print(f"No files found matching: {args.input}")
        return

    for file_path in files:
        medicine_data = process_file(file_path, args.category)
        
        if medicine_data:
            cat = medicine_data.get('category', 'general').lower().replace(' ', '_')
            target_file = os.path.join(args.output, f"{cat}.json")
            
            existing_data = []
            if os.path.exists(target_file):
                try:
                    with open(target_file, 'r', encoding='utf-8') as f:
                        existing_data = json.load(f)
                        if not isinstance(existing_data, list):
                            existing_data = [existing_data]
                except:
                    existing_data = []

            # Check for duplicates by slug
            if not any(m.get('slug') == medicine_data['slug'] for m in existing_data):
                existing_data.append(medicine_data)
                
                with open(target_file, 'w', encoding='utf-8') as f:
                    json.dump(existing_data, f, indent=2)
                print(f"Saved: {medicine_data['name']} to {target_file}")
            else:
                print(f"Skipped (Duplicate): {medicine_data['name']}")
        
        time.sleep(DELAY)

if __name__ == "__main__":
    main()
