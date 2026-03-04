"use client";

import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("");

  useEffect(() => {
    let url = `https://serverapi.studyvarsity.com/api/analytics/summary?page=${page}`;

    if (country) {
      url += `&country=${country}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch(() => { });
  }, [page, country]);

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <TopNav />

      <div className="max-w-7xl mx-auto px-4 mt-6">

        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            📊 Analytics Dashboard
          </h1>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg mt-4 px-4 py-2 bg-white shadow-sm w-full md:w-64"
          >
            <option value="">All Countries</option>
            {data.countryStats.map((item, index) => (
              <option key={index} value={item.country}>
                {item.country}
              </option>
            ))}
          </select>

        </div>

        {/* ================= SECTIONS ================= */}
        <Section title="Lifetime">
          <Card title="Total Visits" value={data.lifetime.totalVisits} />
          <Card title="Unique Visitors" value={data.lifetime.totalUniqueVisitors} />
        </Section>

        <Section title="Today">
          <Card title="Visits" value={data.today.visits} />
          <Card title="Unique Visitors" value={data.today.uniqueVisitors} />
        </Section>

        <Section title="This Week">
          <Card title="Visits" value={data.week.visits} />
          <Card title="Unique Visitors" value={data.week.uniqueVisitors} />
        </Section>

        <Section title="This Month">
          <Card title="Visits" value={data.month.visits} />
          <Card title="Unique Visitors" value={data.month.uniqueVisitors} />
        </Section>

        <Section title="This Year">
          <Card title="Visits" value={data.year.visits} />
          <Card title="Unique Visitors" value={data.year.uniqueVisitors} />
        </Section>

        {/* ================= COUNTRY STATS ================= */}
        <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">
          🌍 Country Stats
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.countryStats.map((item, index) => (
            <div key={index} className="bg-white shadow rounded-xl p-4">
              <h3 className="font-semibold text-lg">{item.country}</h3>
              <p className="text-sm text-gray-600">
                Total Visits: {item.totalVisits}
              </p>
              <p className="text-sm text-gray-600">
                Unique Visitors: {item.uniqueVisitors}
              </p>
            </div>
          ))}
        </div>


        {/* ================= VISITOR LOGS ================= */}
        <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">
          📄 Visitor Logs
        </h2>

        {/* Mobile Card View */}
        {/*  <div className="md:hidden space-y-4">
          {data.logs.data.map((log) => (
            <div key={log.id} className="bg-white p-4 rounded-xl shadow">
              <p><strong>Country:</strong> {log.country}</p>
              <p><strong>Page:</strong> {log.page}</p>
              <p><strong>Device:</strong> {log.device}</p>
              <p><strong>Session:</strong> {log.sessionId.slice(0, 8)}...</p>
              <p className="text-xs text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div> */}

        {/* Desktop Table View */}
        <div className=" overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Country</th>
                <th className="p-3 text-left">Page</th>
                <th className="p-3 text-left">Device</th>
                <th className="p-3 text-left">Session ID</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.logs.data.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-3">{log.country}</td>
                  <td className="p-3">{log.page}</td>
                  <td className="p-3">{log.device}</td>
                  <td className="p-3">{log.sessionId.slice(0, 8)}...</td>
                  <td className="p-3">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm">
            Page {data.logs.page} of {data.logs.totalPages}
          </span>

          <button
            disabled={!data.logs.hasNext}
            onClick={() => setPage(page + 1)}
            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-md">
      <h3 className="text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}