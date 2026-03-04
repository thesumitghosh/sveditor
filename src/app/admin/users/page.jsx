"use client";

import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import axios from "axios";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function Users() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      let url = await axios.get(`https://serverapi.studyvarsity.com/api/user`);
      let latest = _.orderBy(url.data.data, ['created_at'], ['desc']);
      if (!_.isEmpty(url.data.data)) {
        setData(latest);
      }
      console.log("result", url.data.data, _.orderBy(url.data.data, ['created_at'], ['desc']))
    }
    fetchUsers();
  }, []);

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <TopNav />

      <div className="max-w-7xl mx-auto px-4 pt-15">

        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            📊 Users Dashboard
          </h1>


        </div>

        {/* ================= SECTIONS ================= */}
        <Section title="Users">
          <Card title="Total Users" value={data.length} />

        </Section>




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
        {!_.isEmpty(data) &&
          <div className=" overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Userurl</th>
                  <th className="p-3 text-left">Provider</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((log, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">
                      <img src={log?.customimageurl !== null ? "https://serverapi.studyvarsity.com" + log?.customimageurl : log?.image ?? undefined} alt={log?.image ?? undefined}/*  height={35} width={35} */ style={{ border: "1px solid gray", borderRadius: "50px", height: "35px", width: "35px" }}
                        onError={(e) => {
                          // If /icons/user.svg is broken, this runs
                          e.currentTarget.src = "/user.svg";
                        }}
                      />

                    </td>
                    <td className="p-3">{log.name}</td>
                    <td className="p-3">{log.email}</td>
                    <td className="p-3">{log.userurl}</td>
                    <td className="p-3">{log.provider}...</td>
                    <td className="p-3">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        {/* ================= PAGINATION ================= */}
        {/* <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
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
        </div> */}
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