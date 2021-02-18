import Link from "next/link";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import { client } from "../../lib/sanity/client";
import urlFor from "../../lib/sanity/urlFor";
import { postQuery } from "../../lib/sanity/postQuery";

export default function Post({ post }) {
  return (
    <>
      <h1>{post?.title}</h1>
      <p>{post?.publishedAt}</p>
      <hr />
      <img src={urlFor(post?.mainImage).width(300)} />
      <BlockContent blocks={post?.body} />
      <Link href="/">
        <a>Back home</a>
      </Link>
    </>
  );
}

export async function getStaticProps({ params }) {
  let slug;
  const post = await client.fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
