import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import StudioLogo from "./studio-logo.jsx";

export default defineConfig({
  name: "default",
  title: "Transocean Marine Surveyors",
  icon: StudioLogo,
  projectId: "ofoc2r64",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});