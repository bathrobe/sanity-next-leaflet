import groq from "groq";

export const homeQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    location,
    publishedAt,
    "slug": slug.current,
    "categories":   category[]->{title, slug},
    mainImage,
    body,
  }
`;
