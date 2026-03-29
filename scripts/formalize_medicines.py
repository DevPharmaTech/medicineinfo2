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
# Alternative common model names if gemma:2b is not found
FALLBACK_MODELS = ["gemma", "gemma2:2b", "llama3"]
DELAY = 1  # seconds between requests

def check_ollama():
    try:
        response = requests.get("http://localhost:11434/api/tags", timeout=3)
        if response.status_code == 200:
            models = [m['name'] for m in response.json().get('models', [])]
            return True, models
        return False, []
    except Exception as e:
        return False, str(e)

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
    print("--- Medicine Formalization Script Diagnostics ---")
    
    # 1. Check dependencies
    try:
        import requests
    except ImportError:
        print("ERROR: 'requests' library is not installed. Run: pip install requests")
        return

    # 2. Check Ollama
    ok, result = check_ollama()
    if not ok:
        print(f"ERROR: Cannot connect to Ollama at {API_URL}.")
        print(f"Make sure Ollama is running. Error details: {result}")
        return
    
    models = result
    print(f"Ollama connected. Available models: {', '.join(models)}")
    
    current_model = MODEL
    if MODEL not in models:
        print(f"WARNING: Model '{MODEL}' not found.")
        assigned = False
        for m in FALLBACK_MODELS:
            if m in models:
                print(f"Using fallback model: '{m}'")
                current_model = m
                assigned = True
                break
        if not assigned:
            print(f"ERROR: No suitable models found. Please pull a model: ollama pull gemma:2b")
            return

    parser = argparse.ArgumentParser(description="Formalize medicine data using LLM API")
    parser.add_argument("--input", "-i", required=True, help="Input file or directory pattern")
    parser.add_argument("--output", "-o", default="data/medicines", help="Output directory")
    parser.add_argument("--category", "-c", help="Default category group")
    parser.add_argument("--append", "-a", action="store_true", help="Append to existing files")
    
    args = parser.parse_args()

    # Normalize paths for Windows
    input_pattern = os.path.normpath(args.input)
    output_dir = os.path.normpath(args.output)
    
    os.makedirs(output_dir, exist_ok=True)

    # Handle file patterns
    files = glob.glob(input_pattern, recursive=True)
    if not files:
        # Fallback for shells that don't like quotes/patterns
        if '*' in input_pattern:
             # Try listing manually if glob failed
             directory = os.path.dirname(input_pattern) or "."
             pattern = os.path.basename(input_pattern).replace("*", ".*")
             regex = re.compile(pattern)
             try:
                 files = [os.path.join(directory, f) for f in os.listdir(directory) if regex.match(f)]
             except: files = []
             
    if not files:
        print(f"ERROR: No files found matching: {input_pattern}")
        return

    print(f"Found {len(files)} files to process.")

    for file_path in files:
        if not os.path.isfile(file_path): continue
        
        medicine_data = process_file(file_path, args.category)
        
        if medicine_data:
            cat = medicine_data.get('category', 'general').lower().replace(' ', '_').replace('-', '_')
            target_file = os.path.join(output_dir, f"{cat}.json")
            
            existing_data = []
            if os.path.exists(target_file):
                try:
                    with open(target_file, 'r', encoding='utf-8') as f:
                        content = f.read().strip()
                        if content:
                            existing_data = json.loads(content)
                            if not isinstance(existing_data, list):
                                existing_data = [existing_data]
                except Exception as e:
                    print(f"Warning: Could not read existing file {target_file}: {e}")
                    existing_data = []

            # Check for duplicates by slug
            if not any(m.get('slug') == medicine_data['slug'] for m in existing_data):
                existing_data.append(medicine_data)
                
                with open(target_file, 'w', encoding='utf-8') as f:
                    json.dump(existing_data, f, indent=2)
                print(f"SUCCESS: Saved {medicine_data['name']} to {target_file}")
            else:
                print(f"SKIPPED: {medicine_data['name']} (Already exists)")
        else:
            print(f"FAILED: Could not process {os.path.basename(file_path)}. Model returned empty or invalid data.")
        
        time.sleep(DELAY)

if __name__ == "__main__":
    main()
