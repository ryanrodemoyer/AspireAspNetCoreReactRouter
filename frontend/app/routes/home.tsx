import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bobrossify - Famous Paintings" },
    { name: "description", content: "Explore famous paintings from art history" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          🎨 Bobrossify
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Discover masterpieces from the greatest artists in history
        </p>
        <Link
          to="/paintings"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          View Famous Paintings
        </Link>
      </div>
    </main>
  );
}
