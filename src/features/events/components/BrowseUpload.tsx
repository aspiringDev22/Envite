import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

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
      <div className="border-base-300 py-2 px-1 my-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input
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
              className="w-full  focus:ring-0 focus:outline-none focus:border-none"
            />
            <Button
              type="button"
              variant='outline'
              size='icon'
              onClick={handleSearch}
            >
              <CiSearch size={20} />
            </Button>
          </div>

          {(loading || error) && (
            <div className="min-h-[140px] flex justify-center items-center gap-2">
              {loading && <Spinner />}
              {error && <div className="text-sm text-red-400">{error}</div>}
            </div>
          )}
<div className="overflow-y-auto max-h-[40vh] pr-2">
  <div className="grid grid-cols-3 gap-3">
    {photos.map((p) => (
      <button
        key={p.id}
        type="button"
        className="rounded overflow-hidden focus:outline-none"
        onClick={(e) => {
          e.preventDefault();
          confirmRemote(p.src.large);
        }}
        title={`By ${p.photographer}`}
      >
        <img
          src={p.src.small}
          alt={`photo-${p.id}`}
          className="w-full aspect-square object-cover"
        />
      </button>
    ))}
  </div>
</div>


          {!loading && photos.length === 0 && debouncedQuery && (
            <div className="text-sm text-[#cfcfcf]">No results for {debouncedQuery}</div>
          )}
        </div>
      </div>
    </>
  );
}

