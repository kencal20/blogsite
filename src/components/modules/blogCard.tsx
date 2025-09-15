import { BookOpen, Calendar, User } from "lucide-react";
import { CardComponent, getInitials, TagComponent, useBlog } from "../../constants/path";
import { Link } from "react-router-dom";

export default function BlogCard() {
  const { blogs } = useBlog();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {blogs.map((blog) => (
        <CardComponent
          key={blog.id}
          className="col-span-2 hover:shadow-lg transition p-6 flex flex-col w-[100%]"
        >
          <Link to={`/blog/details/${blog.id}`} className="block flex-grow">
            <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
              <div className="sm:order-last sm:shrink-0">
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
              </div>

              <div className="mt-4 sm:mt-0">
                <h3 className="text-2xl font-bold text-gray-900">{blog.title}</h3>
                <section className="mt-1 text-sm text-gray-700">
                  <span className="inline-flex items-center gap-1">
                    <User /> {blog.authorName ?? "Unknown Author"}{" "}
                    {blog.authorEmail ? `(${blog.authorEmail})` : ""}
                  </span>
                </section>
                <p className="mt-4 line-clamp-2 text-sm text-gray-700">
                  {blog.description}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <dl className="mt-6 flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <dd className="text-xs text-gray-700">{blog.date_published}</dd>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <dd className="text-xs text-gray-700">{blog.read_time}</dd>
              </div>

              {blog.tags?.slice(0, 3).map((tag) => (
                <TagComponent key={tag} tag={tag} />
              ))}
            </dl>
          </Link>

          <div className="mt-auto flex justify-end">
            <Link to={`/blog/details/${blog.id}`}>
              <span className="text-sm text-gray-700 hover:underline hover:font-bold">
                Learn more {"›"}
              </span>
            </Link>
          </div>
        </CardComponent>
      ))}
    </div>
  );
}
