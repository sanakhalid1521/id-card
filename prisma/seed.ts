import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const students = [
    {
      name: "Sana Khalid",
      rollNo: "S001",
      className: "10th",
      section: "A",
      fatherName: "Khalid Ahmed",
      dob: new Date("2008-05-15"),
      address: "123 Street, Karachi",
      phone: "0300-1111111",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Ali Ahmed",
      rollNo: "S002",
      className: "10th",
      section: "B",
      fatherName: "Ahmed Khan",
      dob: new Date("2008-08-20"),
      address: "456 Avenue, Karachi",
      phone: "0300-2222222",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Ayesha Bibi",
      rollNo: "S003",
      className: "9th",
      section: "A",
      fatherName: "Muhammad Bibi",
      dob: new Date("2009-01-10"),
      address: "789 Lane, Lahore",
      phone: "0300-3333333",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Hamza Sheikh",
      rollNo: "S004",
      className: "9th",
      section: "C",
      fatherName: "Sheikh Rashid",
      dob: new Date("2009-03-25"),
      address: "321 Road, Islamabad",
      phone: "0300-4444444",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Zainab Fatima",
      rollNo: "S005",
      className: "8th",
      section: "B",
      fatherName: "Fatima Ali",
      dob: new Date("2010-06-12"),
      address: "654 Sector, Karachi",
      phone: "0300-5555555",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Omar Farooq",
      rollNo: "S006",
      className: "8th",
      section: "A",
      fatherName: "Farooq Abdullah",
      dob: new Date("2010-11-05"),
      address: "987 Block, Faisalabad",
      phone: "0300-6666666",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Fatima Zahra",
      rollNo: "S007",
      className: "7th",
      section: "D",
      fatherName: "Zahra Hussain",
      dob: new Date("2011-02-28"),
      address: "159 Square, Multan",
      phone: "0300-7777777",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Bilal Hassan",
      rollNo: "S008",
      className: "7th",
      section: "B",
      fatherName: "Hassan Raza",
      dob: new Date("2011-07-14"),
      address: "753 Plaza, Quetta",
      phone: "0300-8888888",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Sara Khan",
      rollNo: "S009",
      className: "6th",
      section: "A",
      fatherName: "Khan Muhammad",
      dob: new Date("2012-09-30"),
      address: "951 Circle, Peshawar",
      phone: "0300-9999999",
      expiryDate: new Date("2027-12-31"),
    },
    {
      name: "Mustafa Ali",
      rollNo: "S010",
      className: "6th",
      section: "C",
      fatherName: "Ali Raza",
      dob: new Date("2012-12-25"),
      address: "357 Point, Karachi",
      phone: "0300-0000000",
      expiryDate: new Date("2027-12-31"),
    },
  ]

  for (const student of students) {
    await prisma.student.upsert({
      where: { rollNo: student.rollNo },
      update: {},
      create: student,
    })
  }
  console.log("Seed data created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
