"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [minRating, setMinRating] = useState("");

  // fetch with search
  useEffect(() => {
    const query = new URLSearchParams({
      search,
      location,
      maxFees,
      type,
      minRating,
    });

    fetch(`http://localhost:5000/colleges?${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setColleges(data);
        } else {
          console.error("API error:", data);
          setColleges([]); 
        }
      })
      .catch((err) => {
        console.error(err);
        setColleges([]);
      });
  }, [search, location, maxFees, type, minRating]);

  const collegeImages = {
    "Delhi Technological University":
      "https://images.openai.com/static-rsc-4/GZqAZxLEnO1V8jUE2zw_AyW6369aGezoBbi7LXgmUvklZbBiqEpmEmLEgIMXTbmzjRw75hZQgWzwVtQaWidnCZvep5tjogGt3-MwBr9plQj2Xrx5FQ4PjWKpXjlX1B-ruNgeEnhNEYyZYQ0sFa9cKHxubTv7xGuFeeRXyBFObL8?purpose=inline",
    "VIT Vellore":
      "https://images.openai.com/static-rsc-4/-OSSX9jzUjzd9hPBYgvcnWVEUKjbS_vsLEUBSchQJdcE5EHvwIqSZlEJow-I9Qen9oCXTF6A5sNOJA--q5QWuvutaQTQ81WIcZ_RVbldNSfWrHtZpqEdb9c_PlHm9jPhJBQALTnzZ8tWm4AhxXKXPpbaWwJRa8vzWrs9ftDOwbc?purpose=inline",
    "Manipal Institute of Technology":
      "https://images.openai.com/static-rsc-4/KnxVX7YCkKFAVWUEpsYV9ruZEIakOYFEk3hyXCcL5CUru91W8BF25Oswp2tyDUtFi3erHKJRC8JWVbqjvcFeABaJoWO9BWZwD0_ErrsSGU15ddJ7Jg2uFDuoQHKJqN4YmV_CR7FlWCzTIdbCYNmSey2sIA9MQiEYucYeq-15cN8?purpose=inline",
    "SRM University":
      "https://images.openai.com/static-rsc-4/sUEgHSM4zp94zYqPe3btZwuTl2fQqpunn4WZXTBMnjhulvqDsJk4LL_rhhU_k6nKHZvwdrfL_F20IHkOA1_vnZVReU3rcU6cPkaw8RJTeNk6h84NgSmSFRNRRwcg71ll5Vrmq19jV4OwUhH4GgJJ3j3z9ywmfHmUBdDL9oxcCVw?purpose=inline",
    "BITS Pilani":
      "https://images.openai.com/static-rsc-4/PlkmdCUCErIcI3ju0tAQvIpA1CxArxhOt1TxygIVH25jV5ZBX4TzfBllS0Lt6uauj08gtA7Tp3F6RoI9qhzD-HzsdIhHhiOdYtOtGV_4-qAUWGdnDzM3wEPeMd4Sqw_rU6n3sxDSC9iTcN3XFvML7xvuIsbzMEBnbw_V-3Agy8I?purpose=inline",
  };

  // stats
  const stats = useMemo(() => {
    if (!colleges.length) return { avgRating: 0, avgFees: 0 };
    const avgRating =
      colleges.reduce((a, c) => a + c.rating, 0) / colleges.length;
    const avgFees = colleges.reduce((a, c) => a + c.fees, 0) / colleges.length;
    return {
      avgRating: avgRating.toFixed(1),
      avgFees: Math.round(avgFees / 100000) + "L",
    };
  }, [colleges]);

  // toggle compare
  const toggleCompare = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1115] to-[#050608] text-white p-6">
      {/* NAVBAR */}
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          College.Find
        </h1>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by college or city..."
            className="w-full bg-[#1a1d23] px-4 py-2 pl-10 rounded-lg border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        <button className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
          Save list
        </button>

        <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg font-medium shadow-lg">
          Get counselling
        </button>
      </div>
      <div className="flex gap-4 mb-6 flex-wrap">
        {/* Location */}
        <input
          placeholder="Location"
          className="bg-[#1a1d23] px-4 py-2 rounded-lg border border-gray-700"
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Max Fees */}
        <input
          placeholder="Max Fees"
          type="number"
          className="bg-[#1a1d23] px-4 py-2 rounded-lg border border-gray-700"
          onChange={(e) => setMaxFees(e.target.value)}
        />

        {/* Quick Filters */}
        <button
          onClick={() => setMaxFees(200000)}
          className="px-4 py-1 rounded-full bg-[#1a1d23] border border-gray-700 text-sm 
          hover:bg-white hover:text-black transition duration-200 cursor-pointer"
        >
          Affordable
        </button>

        <button
          onClick={() => setMaxFees(400000)}
          className="px-4 py-1 rounded-full bg-[#1a1d23] border border-gray-700 text-sm 
          hover:bg-white hover:text-black transition duration-200 cursor-pointer"
        >
          Premium
        </button>

        <button
            onClick={() => {
              setSearch("");
              setLocation("");
              setMaxFees("");
              setType("");
              setMinRating("");
            }}
            className="px-4 py-1 rounded-full border border-gray-700 text-sm 
            bg-[#1a1d23] hover:bg-red-600 hover:text-white 
            transition duration-200 cursor-pointer"
          >
            Clear
        </button>    

      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {/* All */}
        <button
          onClick={() => {
            setType("");
            setMaxFees("");
            setMinRating("");
          }}
          className="px-4 py-1 rounded-full bg-[#1a1d23] border border-gray-700 text-sm 
          hover:bg-white hover:text-black transition duration-200 cursor-pointer"
        >
          All Colleges
        </button>

        {/* Government */}
        <button
          onClick={() => setType("government")}
          className="px-4 py-1 rounded-full bg-[#1a1d23] border border-gray-700 text-sm 
          hover:bg-white hover:text-black transition duration-200 cursor-pointer"
        >
          Government
        </button>

        {/* Private */}
        <button
          onClick={() => setType("private")}
          className="px-4 py-1 rounded-full bg-[#1a1d23] border border-gray-700 text-sm 
          hover:bg-white hover:text-black transition duration-200 cursor-pointer"
        >
          Private
        </button>

        {/* Top Rated */}
        <button
          onClick={() => {
            setMinRating(4.3);
            setMaxFees("");
          }}
          className="px-4 py-1 rounded-full bg-[#1a1d23] border border-gray-700 text-sm 
          hover:bg-white hover:text-black transition duration-200 cursor-pointer"
        >
          Top Rated
        </button>

        {/* Affordable */}
        <button
          onClick={() => {
            setMaxFees(200000);
            setType("");
          }}
          className="px-4 py-1 rounded-full bg-[#1a1d23] border border-gray-700 text-sm 
          hover:bg-white hover:text-black transition duration-200 cursor-pointer"
        >
          Affordable
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1a1d23] p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">COLLEGES</p>
          <h2 className="text-2xl font-bold">{colleges.length}</h2>
        </div>

        <div className="bg-[#1a1d23] p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">AVG RATING</p>
          <h2 className="text-2xl font-bold">{stats.avgRating}</h2>
        </div>

        <div className="bg-[#1a1d23] p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">AVG FEES / YR</p>
          <h2 className="text-2xl font-bold">₹{stats.avgFees}</h2>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colleges.map((c, i) => (
          <Link key={c.id} href={`/college/${c.id}`}>
            <div
              key={c.id}
              className="bg-[#1a1d23] rounded-xl border border-gray-800 overflow-hidden hover:shadow-2xl transition group"
            >
              {/* IMAGE */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={
                    collegeImages[c.name] ||
                    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
                  }
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute top-2 right-2 text-xs bg-black/60 px-2 py-1 rounded">
                  #{i + 1}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="text-gray-400 text-sm mb-3">📍 {c.location}</p>

                <div className="flex gap-3 mb-3">
                  <div className="bg-black/40 px-3 py-2 rounded">
                    ₹{(c.fees / 100000).toFixed(1)}L
                    <p className="text-xs text-gray-400">Fees</p>
                  </div>

                  <div className="bg-black/40 px-3 py-2 rounded">
                    {c.rating}
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                </div>

                <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                  {c.fees < 200000 ? "Affordable" : "Premium"}
                </span>

                {/* COMPARE BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // 🚀 stops navigation
                    e.stopPropagation(); // 🚀 stops bubbling
                    toggleCompare(c.id);
                  }}
                  className={`mt-4 w-full py-2 rounded-lg transition ${
                    selected.includes(c.id)
                      ? "bg-green-600"
                      : "border border-gray-600 hover:bg-white hover:text-black"
                  }`}
                >
                  {selected.includes(c.id) ? "Selected" : "+ Add to compare"}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* FLOATING COMPARE BUTTON */}
      {selected.length >= 2 && (
        <button
          onClick={() =>
            (window.location.href = `/compare?ids=${selected.join(",")}`)
          }
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full shadow-xl"
        >
          Compare ({selected.length})
        </button>
      )}
    </div>
  );
}
