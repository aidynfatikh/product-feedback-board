// components/EditModal.tsx
import { useState } from "react";
import { useFeedbackStore } from "./types";

export default function EditModal({ item, onClose }: { item: any; onClose: () => void }) {
  const [text, setText] = useState(item.feedback);
  const [rating, setRating] = useState(item.rating);
  const updateFeedback = useFeedbackStore((s) => s.updateFeedback);

  const handleSave = () => {
    updateFeedback(item.id, text, rating);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Feedback</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          rows={4}
        />
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              onClick={() => setRating(val)}
              className={`w-10 h-10 rounded-full border ${
                rating === val
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:bg-blue-100"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
