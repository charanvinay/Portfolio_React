import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "3i58cp7h",
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true,
  token:
    "skJqR1mVpRD8RYYHzTJr86FyUFGZp1xNhOceymbKALkkdIG51SZ9OPpw4z6KFDxgxSv8hO3T61FbQTMiaFV7haO9O9c5nhlkohZ5qWjOazlcyAwU0qpUKd3JjDmyQ8xa07yWxczmIfaEsdFNawofEYPgaeTH4qJFmmh8LZdEfdsXF3tdaWbK",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
