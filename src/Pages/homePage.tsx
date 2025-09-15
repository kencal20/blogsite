import { useState } from "react";
import { BlogCard, ButtonComponent, CardComponent, SidebarComponent, BlogForm } from "../constants/path";
import { useBlog } from "../context/blogContext";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { blogs, loading, createBlog } = useBlog();

  const handleCreateBlog = (blog: any) => {
    createBlog(blog);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row mt-10 gap-10 px-4 sm:px-6 lg:px-10">
      {/* Main content column */}
      <div className="flex flex-col gap-10 w-full lg:w-3/4">
        {/* Welcome Card */}
        <CardComponent className="bg-gray-50 w-full">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome to Our Blog
          </h1>
          <p className="text-base sm:text-lg mt-4 text-gray-400">
            Discover insights, tutorials, and stories from the world of
            technology, design, and development.
            <br />
            Stay updated with the latest trends and best practices.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <ButtonComponent
              content="Explore Articles"
              className="hover:bg-black hover:text-white"
            />
            <ButtonComponent
              content="Create Blog"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </CardComponent>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Featured Post
        </h1>

        {/* Blog Grid */}
        <div className="w-full">
          {loading ? (
            <p className="text-gray-500">Loading blogs...</p>
          ) : blogs.length > 0 ? (
            <BlogCard  />
          ) : (
            <p className="text-gray-500">No blogs available yet.</p>
          )}
        </div>
      </div>

      <SidebarComponent />

      {/* BlogForm Modal */}
      <BlogForm
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBlog}
      />
    </div>
  );
}
