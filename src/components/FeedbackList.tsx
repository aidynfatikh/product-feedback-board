import type { FeedbackItem } from "./types";

type Props = {
    feedbackItems: FeedbackItem[];
};

export default function FeedbackList({ feedbackItems }: Props) {
    if (feedbackItems.length === 0) {
        return <p className="text-gray-500 italic">No feedback submitted yet.</p>;
    }

    return (
        <ul className="space-y-4">
            {feedbackItems.map((item) => (
                <li
                    key={item.id}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
                >
                    <p className="text-gray-800">{item.feedback}</p>
                    <p className="text-sm text-gray-600 mt-2">
                        ⭐ Rating: <span className="font-medium">{item.rating}</span> —{" "}
                        {new Date(item.createdAt).toLocaleString()}
                    </p>
                </li>
            ))}
        </ul>
    );
}
