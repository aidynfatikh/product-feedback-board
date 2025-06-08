import { useState } from "react";
import { useFeedbackStore } from "./types";
import EditModal from "./EditModal";

export default function FeedbackList() {
  const feedbackItems = useFeedbackStore((state) => state.feedbacks);
  const likeFeedback = useFeedbackStore((state) => state.likeFeedback);
  const [editingItem, setEditingItem] = useState<null | any>(null);

  if (feedbackItems.length === 0) {
    return <p className="text-gray-500 italic">No feedback submitted yet.</p>;
  }

  return (
    <>
      <ul className="space-y-4">
        {feedbackItems.map((item) => (
          <li
            key={item.id}
            className="relative p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
          >
            {item.isMine && (
              <button
                onClick={() => setEditingItem(item)}
                className="absolute top-2 right-2 text-xs text-blue-600 hover:underline"
              >
                Edit
              </button>
            )}
            <p className="text-gray-800 font-medium">{item.feedback}</p>
            <p className="text-sm text-gray-600 mt-1">
              ⭐ Rating: <span className="font-semibold">{item.rating}/5</span> —{" "}
              {new Date(item.createdAt).toLocaleString()}
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
              <div>👍 {item.likes}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => likeFeedback(item.id)}
                className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-sm"
              >
                Like
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingItem && <EditModal item={editingItem} onClose={() => setEditingItem(null)} />}
    </>
  );
}
