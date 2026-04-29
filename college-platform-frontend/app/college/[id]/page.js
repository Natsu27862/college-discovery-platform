"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges/${id}`)
      .then(res => res.json())
      .then(data => setCollege(data));
  }, [id]);

  if (!college) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1115] to-[#050608] text-white p-6">

      {/* Back */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="bg-[#1a1d23] p-6 rounded-xl border border-gray-800 mb-6">
        <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
        <p className="text-gray-400 mb-4">📍 {college.location}</p>

        <span className={`text-xs px-3 py-1 rounded ${
          college.type === "government"
            ? "bg-green-700"
            : "bg-purple-700"
        }`}>
          {college.type.toUpperCase()}
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-[#1a1d23] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400">Fees (per year)</p>
          <h2 className="text-xl font-bold mt-2">
            ₹{(college.fees / 100000).toFixed(1)}L
          </h2>
        </div>

        <div className="bg-[#1a1d23] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400">Rating</p>
          <h2 className="text-xl font-bold mt-2">
            ⭐ {college.rating}
          </h2>
        </div>

        <div className="bg-[#1a1d23] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400">Placement Rate</p>
          <h2 className="text-xl font-bold mt-2">
            {college.placementRate}%
          </h2>
        </div>

      </div>

      {/* COURSES */}
      <div className="bg-[#1a1d23] p-6 rounded-xl border border-gray-800 mb-6">
        <h2 className="text-xl font-semibold mb-4">Courses Offered</h2>

        <div className="flex flex-wrap gap-3">
          {college.courses.map((c) => (
            <span
              key={c.course.id}
              className="px-3 py-1 bg-gray-700 rounded-full text-sm"
            >
              {c.course.name}
            </span>
          ))}
        </div>
      </div>

      {/* EXTRA SECTION */}
      <div className="bg-[#1a1d23] p-6 rounded-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Student Reviews</h2>

        <p className="text-gray-400">
          “Great placement opportunities and strong academics.” ⭐⭐⭐⭐☆
        </p>

        <p className="text-gray-400 mt-2">
          “Campus life is amazing, but fees are on the higher side.” ⭐⭐⭐⭐☆
        </p>
      </div>

    </div>
  );
}