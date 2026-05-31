import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// GET all students
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const rollNo = searchParams.get('rollNo');

    const students = await prisma.student.findMany({
      where: {
        ...(className && { className }),
        ...(rollNo && { rollNo: { contains: rollNo } }),
      },
      orderBy: { rollNo: 'asc' },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

// POST new student with Photo Upload
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const rollNo = formData.get('rollNo') as string;
    const className = formData.get('className') as string;
    const section = formData.get('section') as string;
    const fatherName = formData.get('fatherName') as string;
    const dobValue = formData.get('dob') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const expiryValue = formData.get('expiryDate') as string;
    const file = formData.get('photo') as File | null;

    if (!name || !rollNo || !className || !section || !dobValue) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let photoPath = null;

    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = join(process.cwd(), 'public/uploads/students');
      await mkdir(uploadDir, { recursive: true });

      const filename = `${rollNo}_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const path = join(uploadDir, filename);
      
      await writeFile(path, buffer);
      photoPath = `/uploads/students/${filename}`;
    }

    const student = await prisma.student.create({
      data: {
        name,
        rollNo,
        className,
        section,
        fatherName,
        dob: new Date(dobValue),
        address,
        phone,
        expiryDate: new Date(expiryValue || '2027-12-31'),
        photo: photoPath
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error('Create error:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        return NextResponse.json({ error: 'Roll Number already exists!' }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Failed to create student.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
