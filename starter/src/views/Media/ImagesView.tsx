import { useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl, type ImageCell } from "@/core";
import { useTmdb } from "@/hooks";

type ImageResponse = {
  profiles: Array<{
    id: number;
    file_path: string | null;
    vote_count: number;
  }>;
};

const PERSON_ENDPOINT = "https://api.themoviedb.org/3/person";

export const ImagesView = () => {
  const { id } = useParams();

  const { data } = useTmdb<ImageResponse>(
    `${PERSON_ENDPOINT}/${id}/images`,
    {}
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData: ImageCell[] = (data?.profiles ?? [])
    .filter((profiles) => profiles.file_path !== null)
    .map((profiles) => ({
      id: profiles.id,
      imageUrl: getImageUrl(profiles.file_path as string),
      primaryText: `Vote Count: ${profiles.vote_count}`,
    }));

  return (
    <div>
      <ImageGrid images={gridData} />
    </div>
  );
};
