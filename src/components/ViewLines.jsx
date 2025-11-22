import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewLines = () => {
  const { id } = useParams();
  const lines = useSelector((state) => state.keepline?.lines || []);
  const existingLine = lines.find((line) => line._id === id);

  if (!existingLine)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Line not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Back Button */}
        <NavLink
          to="/lines"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 font-medium hover:underline"
        >
          ← Back to Lines
        </NavLink>

        {/* Card */}
        <div className="mt-6 bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {existingLine.title || "Untitled"}
          </h1>

          {/* Timestamp */}
          <div className="mt-2 text-xs text-gray-500">
            {existingLine.createdAt
              ? new Date(existingLine.createdAt).toLocaleString()
              : ""}
          </div>

          {/* Divider */}
          <div className="mt-4 h-px bg-gray-200"></div>

          {/* Content */}
          <div className="mt-6 text-gray-700 text-lg leading-relaxed whitespace-pre-wrap bg-gray-50 p-6 rounded-xl border border-gray-200 ">
            {existingLine.content}
          </div>

          {/* Edit button */}
          <div className="mt-6 flex justify-end">
            <NavLink
              to={`/?lineId=${existingLine._id}`}
              className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
            >
              Edit Line
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLines;
