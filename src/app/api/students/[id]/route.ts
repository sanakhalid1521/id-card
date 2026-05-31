import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// GET single student
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    return NextResponse.json(student);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
  }
}

interface UpdateData {
    name?: string;
    rollNo?: string;
    className?: string;
    section?: string;
    fatherName?: string;
    dob?: Date;
    address?: string;
    phone?: string;
    expiryDate?: Date;
    photo?: string;
}

// PUT update student with Photo Upload support
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const id = parseInt(params.id);

    const data: UpdateData = {};
    
    // Explicitly handling each field to avoid 'any'
    const name = formData.get('name') as string | null;
    if (name) data.name = name;

    const rollNo = formData.get('rollNo') as string | null;
    if (rollNo) data.rollNo = rollNo;

    const className = formData.get('className') as string | null;
    if (className) data.className = className;

    const section = formData.get('section') as string | null;
    if (section) data.section = section;

    const fatherName = formData.get('fatherName') as string | null;
    if (fatherName) data.fatherName = fatherName;

    const dobValue = formData.get('dob') as string | null;
    if (dobValue) data.dob = new Date(dobValue);

    const address = formData.get('address') as string | null;
    if (address) data.address = address;

    const phone = formData.get('phone') as string | null;
    if (phone) data.phone = phone;

    const expiryDateValue = formData.get('expiryDate') as string | null;
    if (expiryDateValue) data.expiryDate = new Date(expiryDateValue);

    const file = formData.get('photo');
    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = join(process.cwd(), 'public/uploads/students');
      await mkdir(uploadDir, { recursive: true });

      const filename = `${data.rollNo || 'updated'}_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const path = join(uploadDir, filename);
      await writeFile(path, buffer);
      data.photo = `/uploads/students/${filename}`;
    }

    const student = await prisma.student.update({
      where: { id },
      data,
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Update Error:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        return NextResponse.json({ error: 'Roll Number already exists!' }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Failed to update student';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE student
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.student.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}
