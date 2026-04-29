import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Delhi Technological University",
    location: "Delhi",
    fees: 180000,
    rating: 4.5,
    placementRate: 92,
    courses: ["CSE", "ECE", "ME"],
    type: "government",
  },
  {
    name: "VIT Vellore",
    location: "Vellore",
    fees: 200000,
    rating: 4.3,
    placementRate: 88,
    courses: ["CSE", "IT", "ECE"],
    type: "private",
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal",
    fees: 220000,
    rating: 4.2,
    placementRate: 85,
    courses: ["CSE", "EEE", "ME"],
    type: "private",
  },
  {
    name: "SRM University",
    location: "Chennai",
    fees: 210000,
    rating: 4.0,
    placementRate: 80,
    courses: ["CSE", "ECE", "IT"],
    type: "private",
  },
  {
    name: "BITS Pilani",
    location: "Pilani",
    fees: 350000,
    rating: 4.8,
    placementRate: 95,
    courses: ["CSE", "ECE", "Mechanical"],
    type: "private",
  }
];

async function main() {
  for (const col of colleges) {
    const createdCollege = await prisma.college.create({
      data: {
        name: col.name,
        location: col.location,
        fees: col.fees,
        rating: col.rating,
        placementRate: col.placementRate,
        type: col.type, 
      }
    });

    for (const courseName of col.courses) {
      let course = await prisma.course.findUnique({
        where: { name: courseName }
      });

      if (!course) {
        course = await prisma.course.create({
          data: { name: courseName }
        });
      }

      await prisma.collegeCourse.create({
        data: {
          collegeId: createdCollege.id,
          courseId: course.id
        }
      });
    }
  }

  console.log("✅ Data seeded successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });