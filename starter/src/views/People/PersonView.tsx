import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, LinkGroup } from "@/components";
import { useTmdb } from "@/hooks";

type PersonResponse = {
  id: number;
  name: string;
  profile_path: string | null;
  birthday: string;
  biography: string;
  place_of_birth: string;
  known_for_department: string;
  popularity: number;
};

const PERSON_ENDPOINT = "https://api.themoviedb.org/3/person";

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="mt-10 animate-pulse text-center text-gray-400 text-lg">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-black px-4 py-12 text-white">
      <Button onClick={() => navigate(-1)}>← Back</Button>
      <div className="mx-auto my-10 max-w-4xl space-y-10 rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] md:p-12">
        {/* Name */}
        <h2 className="font-bold text-4xl tracking-tight md:text-5xl">{data.name}</h2>

        {/* Top Section */}
        <div className="flex flex-col items-start gap-10 md:flex-row">
          <img
            alt={data.name}
            className="w-56 rounded-xl border border-gray-800 object-cover shadow-xl md:w-64"
            src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
          />

          {/* Info Box (THIS is what adds structure) */}
          <div className="flex-1 space-y-5 rounded-xl border border-gray-700 bg-gray-800/40 p-6">
            <p>
              <span className="text-gray-400 text-xs uppercase tracking-wider">Birthday</span>
              <br />
              <span className="text-lg text-white">{data.birthday}</span>
            </p>

            <p>
              <span className="text-gray-400 text-xs uppercase tracking-wider">Place of Birth</span>
              <br />
              <span className="text-lg text-white">{data.place_of_birth}</span>
            </p>

            <p>
              <span className="text-gray-400 text-xs uppercase tracking-wider">Known For</span>
              <br />
              <span className="text-lg text-white">{data.known_for_department}</span>
            </p>

            <p>
              <span className="text-gray-400 text-xs uppercase tracking-wider">Popularity</span>
              <br />
              <span className="text-lg text-white">{data.popularity}</span>
            </p>
          </div>
        </div>

        {/* Biography */}
        <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-6">
          <h3 className="mb-4 font-semibold text-xl">Biography</h3>
          <p className="max-h-80 overflow-y-auto pr-2 text-gray-300 text-sm leading-relaxed md:text-base">{data.biography}</p>
        </div>

        {/* Links */}
        <div className="border-gray-800 border-t pt-4">
          <LinkGroup
            options={[
              { label: "Career", to: "career" },
              { label: "Images", to: "images" },
            ]}
          />
        </div>

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
