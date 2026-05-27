import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const StudioLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <img
      src="/logo.png"
      alt="Transocean Marine Surveyors"
      style={{ height: 28, width: "auto", objectFit: "contain" }}
    />
  </div>
);
export default defineConfig({
  name: "default",
  title: "Transocean Marine Surveyors",
  icon: StudioLogo,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});