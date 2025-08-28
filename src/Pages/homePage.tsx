import { BlogCard, blogList, ButtonComponent, CardComponent, SidebarComponent } from "../constants/path";

type Props = {};

export default function HomePage({ }: Props) {
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
          <ButtonComponent content="Explore Articles" className="mt-6 hover:bg-black hover:text-white " />
        </CardComponent>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Featured Post
        </h1>
        {/* Blog Grid */}
        <div className="w-full">
          <BlogCard blogList={blogList} />
        </div>
      </div>

  
          <SidebarComponent />
     


    </div>
  );
}
