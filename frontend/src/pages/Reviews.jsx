import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({ user: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (pg = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/reviews?page=${pg}`);
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', form);
      setForm({ user: '', rating: 5, comment: '' });
      fetchReviews(page);
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting review');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">💬 User Reviews</h2>

        {/* Add Review Form */}
        <form
          onSubmit={submitReview}
          className="bg-white shadow-md rounded-lg p-6 mb-10"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              value={form.user}
              onChange={(e) => setForm({ ...form, user: e.target.value })}
              className="border p-3 rounded w-full"
              required
            />
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="border p-3 rounded w-full"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && 's'}
                </option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Your Feedback"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="border p-3 rounded w-full mt-4"
            rows="3"
            required
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{rev.user}</h4>
                  <span className="text-yellow-500">
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{rev.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => fetchReviews(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
