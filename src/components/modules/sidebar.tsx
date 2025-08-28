import { Link } from "react-router-dom"
import { blogList, CardComponent, TagComponent } from "../../constants/path"

type Props = {}

export default function SidebarComponent({ }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-1/4">
      {/* About This Blog */}
      <CardComponent className="bg-gray-100 w-full h-64 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-2">About This Blog</h1>
        <p className="text-sm sm:text-base text-center px-4">
          A collection of insights, tutorials, and stories from experienced developers and designers.
          We share practical knowledge to help you grow in your tech journey.
        </p>
      </CardComponent>

      {/* Recent Posts */}
      <CardComponent className="bg-gray-100 w-full flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold mb-2">Recent Posts</h1>
        <div className="flex flex-col gap-3 overflow-y-auto max-h-64">
          {blogList.map((post) => (
            <div
              key={post.id}
              className="flex gap-3 items-start border-b border-gray-200 pb-2"
            >
              <div className="flex flex-col gap-1 w-full">
                {/* Post Title Link */}
                <Link
                  className="text-sm font-semibold text-gray-900 line-clamp-1 hover:text-green-600"
                  to={`/blog/details/${post.id}`}
                >
                  {post.title}
                </Link>

                {/* Author + Meta */}
                <p className="text-xs text-gray-500">
                  {post.authour} • {post.date_published} • {post.read_time}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags?.slice(0, 3).map((tag, index) => (
                    <TagComponent key={index} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardComponent>
    </div>
  )
}
