import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/preview/", "/checkout/", "/dashboard/", "/api/", "/admin/"],
    },
    sitemap: "https://hamarikahani.in/sitemap.xml",
  };
}
