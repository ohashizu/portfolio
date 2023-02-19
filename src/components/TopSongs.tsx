import Image from "next/image";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export async function TopSongs(props: any) {
    const data = await getSpotifyTopSongs();
    return (
        <>
            <div className="h-full overflow-x-auto rounded-lg min-h-[13rem] bg-[#1a202c]">
                <div className="p-5 w-fit">
                    <h1 className="font-bold text-text-color text-lg">Top Songs</h1>
                    <div className="mt-2 flex gap-4 w-fit">
                        {data.data.items.map((song: any) => (
                            <a key={song.id} href={song.external_urls.spotify} className="w-fit">
                                <div className="group w-40 relative h-full">
                                    <div
                                        style={{ width: 160, height: 160 }}
                                        className="z-10 cursor-pointer flex flex-col transition-color duration-200 rounded-lg bg-transparent dark:group-hover:bg-black group-hover:bg-white dark:group-hover:bg-opacity-60 group-hover:bg-opacity-70 absolute"
                                    >
                                        <div className="absolute bottom-3 px-2 transition-all duration-200 text-transparent group-hover:text-black dark:group-hover:text-white">
                                            <h4 className="text-lg font-bold">{song.name}</h4>
                                            <p className="text-md font-metropolis">
                                                {song.artists.map((artist: any) => artist.name).join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-40 w-40">
                                        <Image
                                            fill
                                            alt={song.name}
                                            src={song.album.images[0].url}
                                            placeholder="blur"
                                            style={{ objectFit: "cover" }}
                                            blurDataURL={song.album.images[2].url}
                                            className="rounded-lg"
                                        />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

async function getSpotifyTopSongs() {
    const res = await fetch(`https://api.jackli.dev/spotify/top-items/tracks?time_range=short_term&limit=10`);
    if (!res.ok) {
        throw new Error("Failed to fetch spotify top songs");
    }

    return res.json();
}