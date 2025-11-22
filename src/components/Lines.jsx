import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromLines } from "../Redux/keeplineSlice";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const Lines = () => {
  const lines = useSelector((state) => state.keepline?.lines || []);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const filteredData = useMemo(() => {
    const q = (searchText || "").toLowerCase().trim();
    if (!q) return lines.slice().reverse(); // newest first
    return lines
      .filter((line) => {
        const t = (line?.title || "").toLowerCase();
        const c = (line?.content || "").toLowerCase();
        return t.includes(q) || c.includes(q);
      })
      .slice()
      .reverse();
  }, [lines, searchText]);

  function handleDelete(lineId) {
    dispatch(removeFromLines(lineId));
  }

  async function handleCopy(text) {
    if (!text) return toast.info("Nothing to copy");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      // fallback
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.body.removeChild(ta);
        
      } catch {
        toast.error("Copy failed");
      }
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Search title or content..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full rounded-xl border border-gray-200 shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredData.length === 0 ? (
          <div className="p-6 text-center text-gray-500 rounded-xl border border-dashed border-gray-200">
            No lines found. Create your first line on the Home page.
          </div>
        ) : (
          filteredData.map((line) => (
            <article
              key={line._id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {line?.title || "Untitled"}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {line?.createdAt ? new Date(line.createdAt).toLocaleString() : ""}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {line?.content?.length > 320 ? line.content.slice(0, 320) + "…" : line?.content}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <NavLink
                      to={`/?lineId=${line?._id}`}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition"
                    >
                      {/* Edit icon */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                      Edit
                    </NavLink>

                    <NavLink
                      to={`/lines/${line?._id}`}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 text-gray-700 text-xs hover:bg-gray-50 transition"
                    >
                      {/* View icon */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                      </svg>
                      View
                    </NavLink>

                    <button
                      onClick={() => handleDelete(line._id)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-100 text-red-600 text-xs hover:bg-red-50 transition"
                    >
                      {/* Trash icon */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 6v14a2 2 0 002 2h4a2 2 0 002-2V6" />
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10 11v6M14 11v6" />
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 6V4h6v2" />
                      </svg>
                      Delete
                    </button>

                    <button
                      onClick={() => handleCopy(line?.content || line?.title || "")}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 text-gray-700 text-xs hover:bg-gray-50 transition"
                    >
                      {/* Copy icon */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="1.5" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Copy
                    </button>

                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: line?.title, text: line?.content }).catch(() => {});
                        } else {
                          toast.info("Sharing not supported in this browser");
                        }
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 text-gray-700 text-xs hover:bg-gray-50 transition"
                    >
                      {/* Share icon */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 6l-4-4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 2v13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Lines;
