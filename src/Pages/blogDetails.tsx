import { useParams, Link } from "react-router-dom";
import { SidebarComponent, CardComponent, getInitials } from "../constants/path";
import { Calendar, BookOpen, User, ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import { useBlog } from "../constants/path";

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const { blogs, loading } = useBlog();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">Loading blog...</p>
      </div>
    );
  }

  const blog = blogs.find((b) => String(b.id) === id);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Blog not found</h1>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 mt-6 px-4 sm:px-6 lg:px-10">
      {/* Main Content */}
      <div className="flex flex-col gap-6 w-full lg:w-3/4">
        {/* Back Link */}
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-black text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Meta Top */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          {blog.tags?.[0] && (
            <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium">
              {blog.tags[0]}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />{" "}
            {blog.date_published
              ? new Date(blog.date_published).toLocaleDateString()
              : "Unknown Date"}

          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{blog.title}</h1>

        {/* Author Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {blog.authorAvatar ?
            <img
              src={blog.authorAvatar ?? "/placeholder-avatar.png"}
              alt={blog.authorName ?? "Unknown Author"}
              className="w-10 h-10 rounded-full object-cover"
            /> :
            (
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 text-2xl font-bold">
                {getInitials(blog.authorName)}
              </div>
            )
          }
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />{" "}
            {blog.authorName ?? blog.authorEmail ?? "Unknown Author"}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> {blog.read_time}
          </span>
        </div>

        {/* Cover Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-lg shadow-md w-full object-cover"
        />

        {/* Engagement */}
        <div className="flex items-center gap-6 text-gray-600 mt-2">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" /> 156
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> 31
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="w-4 h-4" /> Share
          </span>
        </div>

        {/* Content */}
        <CardComponent className="p-6">
          <p className="text-base text-gray-700 leading-relaxed">{blog.description}</p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            {/* Placeholder for full content */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
        </CardComponent>
      </div>

      {/* Sidebar */}
      <SidebarComponent />
    </div>
  );
}
