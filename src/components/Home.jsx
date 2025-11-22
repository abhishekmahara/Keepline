import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToline, updateToline } from '../Redux/keeplineSlice'
import { toast } from 'react-toastify'

const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const lineId = searchParams.get('lineId')
  const dispatch = useDispatch()
  const alllines = useSelector((state) => state.keepline?.lines || [])

  useEffect(() => {
    if (lineId) {
      const existingLine = alllines.find((line) => line._id === lineId)
      setTitle(existingLine?.title || '')
      setValue(existingLine?.content || '')
    } else {
      setTitle('')
      setValue('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineId, alllines])

  function createLine() {
    if (!title.trim() && !value.trim()) {
      toast.info('Please provide a title or some content.')
      return
    }

    const line = {
      title: title.trim(),
      content: value,
      _id: lineId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if (lineId) {
      dispatch(updateToline(line))
      
    } else {
      dispatch(addToline(line))
     
    }

    // reset
    setValue('')
    setTitle('')
    setSearchParams({})
  }

  const contentCount = (value || '').length
  const isDisabled = !title.trim() && !value.trim()

  return (
    <div className="min-h-screen  bg-gradient-to-b from-white via-slate-50 to-white flex items-start justify-center py-16 px-3">
      <div className="w-full max-w-7xl ">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mt-0 inline-flex items-center gap-3 bg-indigo-50 text-indigo-700 px-3  rounded-full text-sm mx-auto">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 20h9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Local • Private • Instant
          </div>
        </header>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {lineId ? 'Edit Line' : 'Create New Line'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Short title (optional) and a longer content area for your note or quote.
              </p>
            </div>

            <div className="text-sm text-gray-500 text-right">
              <div>Characters</div>
              <div className="font-medium text-gray-700">{contentCount}</div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-600">Title</span>
              <input
                type="text"
                placeholder="e.g. Morning thought, Line for poem..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-600">Content</span>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={10}
                placeholder="Write your line here..."
                className="mt-2 w-full rounded-xl border border-gray-300 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-200 transition min-h-[200px] bg-white"
              />
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3 mt-2">
              <button
                onClick={createLine}
                disabled={isDisabled}
                className={`w-full sm:w-auto rounded-xl px-6 py-3 font-semibold text-white transition ${
                  isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {lineId ? 'Update Line' : 'Create Line'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTitle('')
                  setValue('')
                  setSearchParams({})
                }}
                className="w-full sm:w-auto rounded-xl px-6 py-3 border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard
                    .writeText(`${title ? title + '\n\n' : ''}${value}`)
                    .then(() => toast.success('Copied to clipboard'))
                    .catch(() => toast.error('Failed to copy'))
                }}
                className="w-full sm:w-auto rounded-xl px-6 py-3 border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Copy
              </button>

              <div className="ml-auto text-sm text-gray-500 mt-2 sm:mt-0">
                Saved locally • Works offline
              </div>
            </div>
          </div>
        </div>

        {/* Subtle footer note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Keepline stores notes in your browser only. Clear your browser storage to remove saved lines.
        </p>
      </div>
    </div>
  )
}

export default Home
