import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FeedbackItem = {
    id: number;
    feedback: string;
    rating: number;
    createdAt: string;
    likes: number;
    isMine: boolean; 
  };
  

type FeedbackStore = {
    feedbacks: FeedbackItem[];
    likedIds: number[]; 
    addFeedback: (feedback: FeedbackItem) => void;
    likeFeedback: (id: number) => void;
    deleteFeedback: (id: number) => void;
    updateFeedback: (id: number, updatedText: string, updatedRating: number) => void;
      
};

export const useFeedbackStore = create<FeedbackStore>()(
    persist(
        (set, get) => ({
            feedbacks: [],
            likedIds: [],
            dislikedIds: [],
            addFeedback: (feedback) => {
                set((state) => ({
                  feedbacks: [...state.feedbacks, { ...feedback, isMine: true }],
                }))
            },
            likeFeedback: (id) => {
                const { likedIds, feedbacks } = get();
                if (likedIds.includes(id)) {
                    set({
                        feedbacks: feedbacks.map((item) =>
                            item.id === id ? { ...item, likes: item.likes - 1 } : item
                        ),
                        likedIds: likedIds.filter((item) => item !== id),
                    });

                    return;
                } // already liked

                set({
                    feedbacks: feedbacks.map((item) =>
                        item.id === id ? { ...item, likes: item.likes + 1 } : item
                    ),
                    likedIds: [...likedIds, id],
                });
            },
            deleteFeedback: (id) => {
                set((state) => ({
                    feedbacks: state.feedbacks.filter((item) => item.id !== id),
                    likedIds: state.likedIds.filter((likedId) => likedId !== id),
                }))
            },
            updateFeedback: (id, updatedText, updatedRating) => {
                set((state) => ({
                  feedbacks: state.feedbacks.map((item) =>
                    item.id === id ? { ...item, feedback: updatedText, rating: updatedRating } : item
                  ),
                }))
            },
        }),
        
        {
            name: 'feedback-storage',
        }
    )
);
