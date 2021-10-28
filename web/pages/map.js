import Link from "next/link";
import { client } from "../lib/sanity/client";
import { mapQuery } from "../lib/sanity/mapQuery";
import dynamic from "next/dynamic"
export default function Map({ geomap }) {
  const MapWithNoSSR = dynamic(()=>import("../component/Map"), {ssr:false})
  return (
    <div>
      <main>
        
        <h1 className="text-2xl font-semibold text-blue-500 text-center py-4">Everywhere I've Been</h1>
        <hr className="py-4"/>        
        <h1 className="text-lg text-blue-600 text-center">Go <Link href="/"><a>home</a></Link></h1>
        
        <ul>
        <div id="map" style={{height: "100vh", width: "100%"}}><MapWithNoSSR type="bigMap" locations={geomap} /></div>
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const geomap = await client.fetch(mapQuery);

  return {
    props: {
      geomap,
    },
  };
}
