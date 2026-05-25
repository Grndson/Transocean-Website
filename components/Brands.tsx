import fs from "fs";
import path from "path";
import Image from "next/image";
import { SITE } from "@/lib/constants";

const logoDirectory = path.join(process.cwd(), "public", "brands");
const logoExtensions = [".png", ".svg", ".jpg", ".jpeg", ".webp"];

function getBrandLogoSrc(brand: string) {
  const filename = brand.toLowerCase().replace(/\s+/g, "-");
  const ext = logoExtensions.find((extension) =>
    fs.existsSync(path.join(logoDirectory, `${filename}${extension}`))
  );
  return ext ? `/brands/${filename}${ext}` : undefined;
}

export function BrandsBar() {
  const visibleBrands = SITE.brands
    .map((brand) => ({ brand, src: getBrandLogoSrc(brand) }))
    .filter((item) => item.src);

  return (
    <div
      className="py-10 border-y"
      style={{ background: "#f4f6f9", borderColor: "#e8edf4" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10">
          <span
            className="w-full text-center text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8a9ab5] mb-4 sm:mb-0"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Equipment We Supply
          </span>

          {visibleBrands.map(({ brand, src }) => (
            <div
              key={brand}
              className="relative h-16 w-32 sm:h-20 sm:w-44 md:h-24 md:w-52 rounded-2xl bg-white p-2 shadow-sm shadow-slate-200/60 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <Image
                src={src!}
                alt={brand}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClassificationSocieties() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span
            className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-3"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Approved By
          </span>
          <h2
            className="text-[clamp(26px,3vw,38px)] font-extrabold text-[#0a1628] mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Classification Societies
          </h2>
          <p className="text-[16px] text-[#6b7e9a] max-w-2xl mx-auto">
            Our surveys and marine electronics services are accepted by the world&apos;s leading classification bodies.
          </p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-lg overflow-hidden"
          style={{ background: "#e8edf4" }}
        >
          {SITE.classificationSocieties.map((society) => (
            <div
              key={society.abbr}
              className="bg-white px-6 py-10 text-center group transition-all hover:bg-[#0a1628]"
            >
              <div
                className="text-[30px] font-extrabold text-[#1a6b8a] group-hover:text-[#1e90b8] mb-2 transition-colors"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {society.abbr}
              </div>
              <div className="text-[13px] text-[#8a9ab5] group-hover:text-white/50 transition-colors">
                {society.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}