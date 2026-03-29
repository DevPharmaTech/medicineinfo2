import { NextResponse } from 'next/server';
import { medicineService } from '@/services/medicineService';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const medicine = await medicineService.getMedicineById(id);
    
    if (!medicine) {
      return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
    }
    
    return NextResponse.json(medicine);
  } catch (error) {
    console.error('Error fetching medicine:', error);
    return NextResponse.json({ error: 'Failed to fetch medicine' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updatedMedicine = await medicineService.updateMedicine(id, data);
    
    if (!updatedMedicine) {
      return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedMedicine);
  } catch (error) {
    console.error('Error updating medicine:', error);
    return NextResponse.json({ error: 'Failed to update medicine' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await medicineService.deleteMedicine(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Medicine not found or already deleted' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    return NextResponse.json({ error: 'Failed to delete medicine' }, { status: 500 });
  }
}
