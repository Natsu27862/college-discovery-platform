"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Compare() {
  const params = useSearchParams();
  const ids = params.get("ids");

  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    if (ids) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/compare?ids=${ids}`)
        .then((res) => res.json())
        .then((data) => setColleges(data));
    }
  }, [ids]);

  if (!colleges.length) {
    return <div className="text-white p-6">Loading...</div>;
  }

  //  find best values
  const bestRating = Math.max(...colleges.map((c) => c.rating));
  const bestPlacement = Math.max(...colleges.map((c) => c.placementRate));
  const lowestFees = Math.min(...colleges.map((c) => c.fees));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1115] to-[#050608] text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        ⚖️ Compare Colleges
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colleges.map((c) => (
          <div
            key={c.id}
            className="bg-[#1a1d23] rounded-xl p-6 border border-gray-800 hover:shadow-xl transition"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">{c.name}</h2>
            {c.rating === bestRating && (
              <span className="text-xs bg-green-600 px-2 py-1 rounded">
                BEST RATING
              </span>
            )}

            <p className="text-gray-400 mb-4">📍 {c.location}</p>

            {/* Type */}
            <span
              className={`text-xs px-2 py-1 rounded ${
                c.type === "government" ? "bg-green-700" : "bg-purple-700"
              }`}
            >
              {c.type.toUpperCase()}
            </span>

            {/* Stats */}
            <div className="mt-5 space-y-4">
              {/* Fees */}
              <div
                className={`p-3 rounded ${
                  c.fees === lowestFees ? "bg-green-800/40" : "bg-black/40"
                }`}
              >
                <p className="text-sm text-gray-400">Fees</p>
                <h3 className="text-lg font-bold">
                  ₹{(c.fees / 100000).toFixed(1)}L
                </h3>
              </div>

              {/* Rating */}
              <div
                className={`p-3 rounded ${
                  c.rating === bestRating ? "bg-green-800/40" : "bg-black/40"
                }`}
              >
                <p className="text-sm text-gray-400">Rating</p>
                <h3 className="text-lg font-bold">⭐ {c.rating}</h3>
              </div>

              {/* Placement */}
              <div
                className={`p-3 rounded ${
                  c.placementRate === bestPlacement
                    ? "bg-green-800/40"
                    : "bg-black/40"
                }`}
              >
                <p className="text-sm text-gray-400">Placement</p>
                <h3 className="text-lg font-bold">{c.placementRate}%</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
