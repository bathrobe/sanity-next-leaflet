import groq from "groq";

export const mapQuery = groq`
  *[_type == "post"] {
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
