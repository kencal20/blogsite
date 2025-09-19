export default function FooterComponent() {
  return (
    <footer className="w-full py-4  text-center text-sm text-gray-600 dark:text-gray-400  shadow-gray-600">
      © {new Date().getFullYear()} Your BlogSite. All rights reserved.
    </footer>
  );
}
