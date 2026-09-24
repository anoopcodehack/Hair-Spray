import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, CheckCircle2, ThumbsUp, Plus, X } from 'lucide-react';
import { REVIEWS_LIST, SALON_INFO, SERVICES_LIST } from '../data/salonData';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_LIST);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [newService, setNewService] = useState('Keratin Treatment (L\'Oreal / Matrix)');
  const [newComment, setNewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Close modal and reset form
  const handleCloseModal = () => {
    setIsWriteModalOpen(false);
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setHoverRating(null);
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWriteModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWriteModalOpen]);

  const ratingDescriptions: Record<number, string> = {
    5: '5 Stars · Outstanding Experience',
    4: '4 Stars · Very Good & Satisfied',
    3: '3 Stars · Decent Experience',
    2: '2 Stars · Room for Improvement',
    1: '1 Star · Unsatisfied',
  };

  const ratingsBreakdown = [
    { stars: '5 Star', percent: 84, count: 253 },
    { stars: '4 Star', percent: 12, count: 36 },
    { stars: '3 Star', percent: 3, count: 9 },
    { stars: '2 Star', percent: 1, count: 2 },
    { stars: '1 Star', percent: 0, count: 1 },
  ];


  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const userReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName,
      rating: newRating,
      date: 'Just now',
      service: newService,
      treatmentTag: newService.split(' ')[0],
      comment: newComment,
      verified: true,
      avatar: newName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    };

    setReviews([userReview, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsWriteModalOpen(false);
      setNewName('');
      setNewComment('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-white text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-12">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>Client Perspectives</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 max-w-2xl leading-[1.1]">
              Verified Feedback & Salon Accolades
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
            Real guest feedback from over 5,000 satisfied clients across Mangalore, Kavoor, and surrounding coastal districts.
          </p>
        </div>

        {/* Aggregate Breakdown + Summary Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          {/* Big Rating Summary Block */}
          <div className="lg:col-span-4 p-8 rounded-[28px] bg-[#FAFAFA] border border-zinc-200 text-center flex flex-col items-center justify-center shadow-xs">
            <span className="text-6xl sm:text-7xl font-serif font-bold text-zinc-950 tracking-tight">
              4.7
            </span>
            <div className="flex items-center gap-1.5 my-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm font-serif font-bold text-zinc-950">
              Google Verified Rating
            </p>
            <p className="text-xs font-sans text-zinc-500 mb-6 mt-1 font-medium">
              Based on {SALON_INFO.reviewsCount} verified reviews
            </p>

            <button
              id="write-review-trigger-btn"
              onClick={() => setIsWriteModalOpen(true)}
              className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Detailed Star Distribution Bars */}
          <div className="lg:col-span-8 p-8 rounded-[28px] bg-[#FAFAFA] border border-zinc-200 flex flex-col justify-center shadow-xs">
            <h3 className="text-lg font-serif font-bold text-zinc-950 mb-6">
              Distribution & Breakdown
            </h3>
            <div className="space-y-3.5">
              {ratingsBreakdown.map((row, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-sans">
                  <span className="w-16 text-zinc-600 shrink-0 font-medium">
                    {row.stars}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="h-full bg-zinc-900 rounded-full"
                    />
                  </div>
                  <span className="w-12 text-right text-zinc-950 font-bold shrink-0">
                    {row.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-7 rounded-[24px] bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md flex flex-col justify-between transition-all shadow-xs"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 font-sans text-xs font-bold flex items-center justify-center shadow-2xs">
                      {review.avatar || review.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-serif font-bold text-zinc-950">
                          {review.name}
                        </h4>
                        {review.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6868]" />
                        )}
                      </div>
                      <span className="text-[11px] font-sans text-zinc-400">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Service Tag */}
                <div className="mb-3">
                  <span className="text-[11px] font-sans px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium">
                    {review.service}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-zinc-100 flex items-center justify-between text-[11px] font-sans text-zinc-400">
                <span>Verified Client</span>
                <span className="flex items-center gap-1 text-[#9E6868] font-bold">
                  <ThumbsUp className="w-3 h-3" /> Recommended
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Write a Review Modal */}
        <AnimatePresence>
          {isWriteModalOpen && (
            <div
              id="review-modal-backdrop"
              onClick={handleCloseModal}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                id="review-modal-card"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg p-8 rounded-[28px] border border-zinc-200 bg-white text-zinc-900 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
              >
                {/* Cancel / Close Top Button */}
                <button
                  type="button"
                  id="close-review-modal-btn"
                  onClick={handleCloseModal}
                  aria-label="Cancel and close review modal"
                  className="absolute top-6 right-6 p-2 rounded-full border border-zinc-200 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-2xl font-serif font-bold text-zinc-950 mb-1">
                  Share Your Experience
                </h3>
                <p className="text-xs text-zinc-500 mb-6 font-normal">
                  Help fellow guests discover the best styling and care at Hair Spray Salon.
                </p>

                {submittedMessage ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <CheckCircle2 className="w-14 h-14 text-[#9E6868] mb-3 animate-bounce" />
                    <h4 className="text-xl font-serif font-bold text-zinc-950">
                      Thank You For Your Review!
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1 font-sans font-medium">
                      Your feedback has been published.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-4">
                    {/* Star Selector with Interactive Preview */}
                    <div>
                      <div className="flex items-center justify-between mb-2 font-sans text-xs">
                        <label className="text-zinc-700 font-semibold">
                          Your Rating
                        </label>
                        <span className="text-[#9E6868] font-bold">
                          {ratingDescriptions[hoverRating ?? newRating]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isFilled = star <= (hoverRating ?? newRating);
                          return (
                            <button
                              type="button"
                              key={star}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(null)}
                              onClick={() => setNewRating(star)}
                              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                              className="p-1 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                            >
                              <Star
                                className={`w-7 h-7 transition-colors ${
                                  isFilled
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-zinc-300'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-zinc-700 mb-1.5 font-semibold">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Rai"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 placeholder:text-zinc-400 text-xs focus:border-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-zinc-700 mb-1.5 font-semibold">
                        Service Experienced
                      </label>
                      <select
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs focus:border-zinc-900 focus:bg-white focus:outline-none"
                      >
                        {SERVICES_LIST.map((srv) => (
                          <option key={srv.id} value={srv.name} className="bg-white text-zinc-900">
                            {srv.name} ({srv.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-zinc-700 mb-1.5 font-semibold">
                        Your Review
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Share your thoughts on the treatment, staff hospitality, and salon ambience..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 placeholder:text-zinc-400 text-xs focus:border-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Action Buttons: Cancel and Post Review */}
                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        id="cancel-review-btn"
                        onClick={handleCloseModal}
                        className="flex-1 py-3 rounded-full border border-zinc-300 text-zinc-700 hover:bg-zinc-100 font-sans uppercase tracking-wider text-xs transition-all hover:scale-105 cursor-pointer text-center font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        id="submit-review-btn"
                        className="flex-1 py-3 rounded-full bg-zinc-900 text-white hover:bg-black font-sans uppercase tracking-wider font-semibold text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer text-center shadow-md"
                      >
                        Post Review
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
