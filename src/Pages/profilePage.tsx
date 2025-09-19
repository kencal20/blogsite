import { useAuth } from "../context/authContext";
import { getInitials } from "../utils/getInitials";
import { useBlog } from "../context/blogContext";
import { CardComponent, TagComponent } from "../constants/path";
import { BookOpen, Calendar, User, Mail,  } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();
  const { blogs } = useBlog();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">No user data available.</p>
      </div>
    );
  }

  const userBlogs = blogs.filter((blog) => blog.authorEmail === user.email);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10 space-y-10">
      {/* Profile Card - Fully Revamped */}
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Avatar + Name */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-20 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {getInitials(user.name)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                <Mail size={16} /> {user.email}
              </p>
           
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition">
              Edit Profile
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition">
              Account Settings
            </button>
          </div>
        </div>

        {/* Extra Info / Bio Section */}
        <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Welcome back, <span className="font-semibold">{user.name.split(" ")[0]}</span>!  
            Here you can manage your profile, check your blogs, and customize your account preferences.
          </p>
        </div>
      </div>

      {/* User Blogs Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Your Blogs
        </h2>

        {userBlogs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
            You haven't written any blogs yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {userBlogs.map((blog) => (
              <CardComponent
                key={blog.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
              >
                <Link to={`/blog/details/${blog.id}`} className="block flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {blog.title}
                  </h3>
                  <section className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    <span className="inline-flex items-center gap-1">
                      <User /> {blog.authorName ?? "Unknown Author"}
                    </span>
                  </section>
                  <p className="mt-4 line-clamp-2 text-sm text-gray-700 dark:text-gray-400">
                    {blog.description}
                  </p>

                  {/* Metadata */}
                  <dl className="mt-6 flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <dd className="text-xs text-gray-700 dark:text-gray-400">
                        {blog.date_published}
                      </dd>
                    </div>

                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <dd className="text-xs text-gray-700 dark:text-gray-400">
                        {blog.read_time}
                      </dd>
                    </div>

                    {blog.tags?.slice(0, 3).map((tag) => (
                      <TagComponent key={tag} tag={tag} />
                    ))}
                  </dl>
                </Link>

                <div className="mt-auto flex justify-end">
                  <Link to={`/blog/details/${blog.id}`}>
                    <span className="text-sm text-teal-600 hover:underline hover:font-bold">
                      Learn more {"›"}
                    </span>
                  </Link>
                </div>
              </CardComponent>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
