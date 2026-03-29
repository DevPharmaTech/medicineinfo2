# Medicine Data Formalization Script

This script uses a local LLM (Ollama) to convert raw medicine text descriptions into a standardized JSON format.

## Prerequisites
- **Python 3.x**
- **Ollama** running locally with `gemma:2b` model.
- `pip install requests`

## Usage
Run the script using the following command:

```bash
python scripts/formalize_medicines.py --input "data/raw/*.txt" --output "data/medicines" --category "Analgesics"
```

### Options
- `--input`, `-i`: Path to raw text files (glob pattern supported).
- `--output`, `-o`: Directory to save formatted JSON (default: `data/medicines`).
- `--category`, `-c`: Default category group (e.g. Analgesics, Antibiotics).
- `--append`, `-a`: Appends to existing category-specific JSON files instead of creating new ones.

## Example Raw File (`data/raw/aspirin.txt`)
```text
Aspirin is used to treat pain, and reduce fever or inflammation. Common dosage 325mg tablets. Side effects include stomach upset.
```

## Result (`data/medicines/analgesics.json`)
```json
[
  {
    "id": "e7c6b...",
    "slug": "aspirin",
    "name": "Aspirin",
    "category": "Analgesics",
    "genericName": "Acetylsalicylic acid",
    "manufacturer": "Generics Pharma",
    "description": "...",
    "dosages": ["325mg tablet"],
    "sideEffects": ["Stomach upset"],
    "precautions": "Consult doctor before use if you have bleeding disorders.",
    "imageUrl": "",
    "createdAt": "2026-03-29T...",
    "updatedAt": "2026-03-29T..."
  }
]
```
