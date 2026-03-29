import { NextResponse } from 'next/server';
import { medicineService } from '@/services/medicineService';

export async function POST(req) {
  try {
    const { medicines } = await req.json();

    if (!Array.isArray(medicines)) {
      return NextResponse.json({ error: 'Invalid data format. Expected an array of medicines.' }, { status: 400 });
    }

    const results = {
      total: medicines.length,
      success: 0,
      failed: 0,
      errors: []
    };

    // Bulk creation
    for (const med of medicines) {
      try {
        // Clean up _id if present to let our service/DB handle it
        const { _id, ...cleanMed } = med;
        await medicineService.createMedicine(cleanMed);
        results.success++;
      } catch (err) {
        results.failed++;
        results.errors.push({ name: med.name || 'Unknown', error: err.message });
      }
    }

    return NextResponse.json({ 
        message: `Import completed: ${results.success} succeeded, ${results.failed} failed.`,
        results 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Batch import failed: ' + error.message }, { status: 500 });
  }
}
