export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
    </div>
  );
}
