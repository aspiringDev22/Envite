import { useState } from "react";

export default function BrowseUpload({
  confirmRemote,
}: {
  confirmRemote: (url: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [photos, setPhotos] = useState<
    {
      id: number;
      src: { small: string; medium: string; large: string };
      photographer: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    fetch(`/api/pexels?q=${encodeURIComponent(query.trim())}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch");
        }
        return res.json();
      })
      .then((json) => {
        setPhotos(
          (json.photos ?? []).map((p: any) => ({
            id: p.id,
            src: { small: p.src.small, medium: p.src.medium, large: p.src.large },
            photographer: p.photographer,
          }))
        );
      })
      .catch(() => {
        setError("Could not fetch images");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <input
        type="radio"
        name="my_tabs_2"
        className="tab text-lg font-semibold"
        aria-label="Browse"
      />
      <div className="tab-content border-base-300 bg-[#212121] p-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setDebouncedQuery(query.trim());
                }
              }}
              placeholder="Search Images"
              className="input input-bordered w-full bg-[#2b2b2b] text-white hover:bg-[#3a3a3a] focus:ring-0 focus:outline-none focus:border-[#d3d3d3]"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-soft px-4 text-dark bg-[#ECECEC] btn-md rounded-md active:scale-95 transition-transform"
            >
              Search
            </button>
          </div>

          {(loading || error) && (
            <div className="min-h-[140px] flex justify-center items-center gap-2">
              {loading && <span className="loading loading-ring loading-lg"></span>}
              {error && <div className="text-sm text-red-400">{error}</div>}
            </div>
          )}

          <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
            {photos.map((p) => (
              <button
                key={p.id}
                type="button"
                className="rounded overflow-hidden focus:outline-none"
                onClick={(e) => {
                  e.preventDefault(); 
                  confirmRemote(p.src.large);
                  const el = document.getElementById("my_modal_7") as HTMLInputElement | null;
                  if (el) el.checked = false;
                }}
                title={`By ${p.photographer}`}
              >
                <img src={p.src.small} alt={`photo-${p.id}`} className="w-full h-44 cursor-pointer object-cover" />
              </button>
            ))}
          </div>

          {!loading && photos.length === 0 && debouncedQuery && (
            <div className="text-sm text-[#cfcfcf]">No results for {debouncedQuery}</div>
          )}
        </div>
      </div>
    </>
  );
}
