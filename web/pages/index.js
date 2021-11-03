import Link from "next/link";
import { client } from "../lib/sanity/client";
import { homeQuery } from "../lib/sanity/homeQuery";
//this library will let leaflet work its magic
import dynamic from "next/dynamic"

export default function Home({ posts }) {
  //here's how we import the Map component without SSR, so Next can display it
  const MapWithNoSSR = dynamic(()=>import("../component/Map"), {ssr:false})
  //little function to help display formatted dates
  const formatDate = (pubDate) => {
    let d = new Date(pubDate)
    return d.toLocaleString('en-US')
  } 
  return (
    <div>
      <main>
        <header className="flex justify-evenly items-center pb-24 my-4">
        <h1 className="text-2xl font-semibold text-blue-500 text-center">My 🌎Globetrotting🌍 Blog</h1>
        <h2 className="text-lg font-medium text-blue-800 text-center hover:underline"><Link href="/map"><a >🗺️See Where I've Been🗺️➡️</a></Link></h2>
        </header>
        
        <ul className="max-w-3xl mx-auto">
          {/* here we map the posts out in cards */}
          {posts.map((p) => (
            <li key={p._id}>
            <div className="flex justify-between py-8">
              <div id="map" style={{height: "300px", width: "400px"}}>
                {/* each post's latitude and longitude are passed from Sanity's geopoint input to react-leaflet */}
                <MapWithNoSSR lat={p.location.lat} long={p.location.lng} />
              </div>
              <div className="">
                <Link href={`/posts/${p.slug}`}>
                  <a className="text-3xl font-bold text-left tracking-tight">{p.title}</a>
                </Link>
                <p className="my-4 text-lg text-gray-700">{formatDate(p.publishedAt)}</p></div></div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  //take a look at the homeQuery in the lib folder to see how the locations are retrieved in GROQ
  const posts = await client.fetch(homeQuery);

  return {
    props: {
      posts,
    },
  };
}
