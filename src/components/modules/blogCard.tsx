import { BookOpen, Calendar, User } from "lucide-react"
import { CardComponent, type componentProps, authorList, TagComponent } from "../../constants/path"
import { Link } from "react-router-dom"

type Props = {
  blogList: componentProps["blogList"][]
}

export default function BlogCard({ blogList }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {blogList.map((blog) => {
        const author = authorList.find((a) => a.id === blog.authour) // 🔑 resolve by ID

        return (
          <CardComponent
            key={blog.id}
            className="col-span-2 hover:shadow-lg transition p-6 flex flex-col w-[100%]"
          >
            <Link to={`blog/details/${blog.id}`} className="block flex-grow">
              {/* Top Section */}
              <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                  <img
                    alt={author?.name}
                    src={author?.avatar}
                    className="size-16 rounded-full object-cover sm:size-[72px]"
                  />
                </div>

                <div className="mt-4 sm:mt-0">
                  <h3 className="text-2xl font-bold text-gray-900">{blog.title}</h3>
                  <section className="mt-1 text-sm text-gray-700">
                    <span className="inline-flex items-center gap-1">
                      <User /> {author?.name}
                    </span>
                  </section>
                  <p className="mt-4 line-clamp-2 text-sm text-gray-700">
                    {blog.description}
                  </p>
                </div>
              </div>

              {/* Metadata + Tags */}
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

            {/* Stick this at bottom-right */}
            <div className="mt-auto flex justify-end">
              <Link to={`blog/details/${blog.id}`}>
                <span className="text-sm text-gray-700 hover:underline hover:font-bold">
                  Learn more {"›"}
                </span>
              </Link>
            </div>
          </CardComponent>
        )
      })}
    </div>
  )
}
