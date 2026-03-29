import { NextResponse } from 'next/server';
import { medicineService } from '@/services/medicineService';

export async function GET() {
  try {
    const medicines = await medicineService.getAllMedicines();
    return NextResponse.json(medicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return NextResponse.json({ error: 'Failed to fetch medicines' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newMedicine = await medicineService.createMedicine(data);
    return NextResponse.json(newMedicine, { status: 201 });
  } catch (error) {
    console.error('Error creating medicine:', error);
    return NextResponse.json({ error: 'Failed to create medicine' }, { status: 500 });
  }
}
