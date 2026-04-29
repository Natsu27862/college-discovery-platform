import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/colleges", async (req, res) => {
  try {
    const { search, location, maxFees, type, minRating } = req.query;

    const colleges = await prisma.college.findMany({
      where: {
        name: search
          ? { contains: search, mode: "insensitive" }
          : undefined,

        location: location
          ? { contains: location, mode: "insensitive" }
          : undefined,

        fees: maxFees ? { lte: Number(maxFees) } : undefined,

        rating: minRating ? { gte: Number(minRating) } : undefined,

        type: type || undefined,
      },
    });

    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/colleges/:id", async (req, res) => {
  const id = Number(req.params.id);

  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: {
        include: {
          course: true,
        },
      },
    },
  });

  res.json(college);
});

app.get("/compare", async (req, res) => {
  const ids = req.query.ids.split(",").map(Number);

  const colleges = await prisma.college.findMany({
    where: {
      id: { in: ids },
    },
  });

  res.json(colleges);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});