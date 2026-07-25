import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HamariKahani",
    short_name: "HamariKahani",
    description: "Premium Digital Storytelling",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f7f5",
    theme_color: "#f8f7f5",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
