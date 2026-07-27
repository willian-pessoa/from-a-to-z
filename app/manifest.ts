import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "De A à Z",
    short_name: "LoL A-Z",
    description:
      "Se desafie jogando com todos os campões possiveis e busque a vitoria com cada um deles.",
    start_url: "/",
    display: "standalone",
    background_color: "#052e16",
    theme_color: "#047857",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
