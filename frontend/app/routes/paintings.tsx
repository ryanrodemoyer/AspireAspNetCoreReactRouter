import type { Route } from "./+types/paintings";
import type { FamousPainting } from "../types/painting";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Famous Paintings" },
    { name: "description", content: "Browse famous paintings from art history" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  // Use process.env for server-side code (Aspire injects these at runtime)
  const apiUrl = process.env.services__api__https__0 
    || process.env.services__api__http__0
    || process.env.API_HTTPS
    || process.env.API_HTTP
    || "http://localhost:5172";
  
  const response = await fetch(`${apiUrl}/api/paintings`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch paintings");
  }
  
  const paintings: FamousPainting[] = await response.json();
  return { paintings };
}

export default function Paintings({ loaderData }: Route.ComponentProps) {
  const { paintings } = loaderData;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Famous Paintings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore masterpieces from the greatest artists in history
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paintings.map((painting) => (
            <article
              key={painting.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {painting.imageUrl && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={painting.imageUrl}
                    alt={painting.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {painting.title}
                </h2>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {painting.artist}
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    <span className="font-medium">Year:</span> {painting.year}
                  </p>
                  {painting.medium && (
                    <p>
                      <span className="font-medium">Medium:</span> {painting.medium}
                    </p>
                  )}
                  {painting.museum && (
                    <p>
                      <span className="font-medium">Location:</span> {painting.museum}
                    </p>
                  )}
                </div>
                {painting.description && (
                  <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {painting.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
