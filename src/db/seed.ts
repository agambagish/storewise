/** biome-ignore-all lint/suspicious/noConsole: _ */
import "dotenv/config";

import { db } from ".";
import { categories, subcategories } from "./schema";

const data = [
  {
    label: "Graphics",
    slug: "graphics",
    emoji: "🎨",
    subcategories: [
      {
        label: "Icons",
        slug: "icons",
      },
      {
        label: "Illustrations",
        slug: "illustrations",
      },
      {
        label: "Templates",
        slug: "templates",
      },
      {
        label: "Mockups",
        slug: "mockups",
      },
    ],
  },
  {
    label: "UI Kits",
    slug: "ui-kits",
    emoji: "📱",
    subcategories: [
      {
        label: "Web",
        slug: "web",
      },
      {
        label: "Mobile",
        slug: "mobile",
      },
      {
        label: "Dashboard",
        slug: "dashboard",
      },
    ],
  },
  {
    label: "Fonts",
    slug: "fonts",
    emoji: "✏️",
    subcategories: [
      {
        label: "Sans Serif",
        slug: "sans-serif",
      },
      {
        label: "Serif",
        slug: "serif",
      },
      {
        label: "Display",
        slug: "display",
      },
    ],
  },
  {
    label: "Photos",
    slug: "photos",
    emoji: "📸",
    subcategories: [
      {
        label: "Nature",
        slug: "nature",
      },
      {
        label: "Business",
        slug: "business",
      },
      {
        label: "Technology",
        slug: "technology",
      },
    ],
  },
  {
    label: "Videos",
    slug: "videos",
    emoji: "🎬",
    subcategories: [
      {
        label: "Motion Graphics",
        slug: "motion-graphics",
      },
      {
        label: "Stock Footage",
        slug: "stock-footage",
      },
    ],
  },
  {
    label: "Audio",
    slug: "audio",
    emoji: "🎵",
    subcategories: [
      {
        label: "Music",
        slug: "music",
      },
      {
        label: "Sound Effects",
        slug: "sound-effects",
      },
    ],
  },
];

(async () => {
  try {
    for (const category of data) {
      const parentCategory = await db
        .insert(categories)
        .values({
          label: category.label,
          emoji: category.emoji,
          slug: category.slug,
        })
        .returning({ id: categories.id })
        .then((c) => c[0]);

      for (const subcategory of category.subcategories) {
        await db.insert(subcategories).values({
          label: subcategory.label,
          slug: subcategory.slug,
          categoryId: parentCategory.id,
        });
      }
    }

    console.log("✅ DB seeded successfully");
    process.exit(0);
  } catch (e) {
    console.error("❌ Unable to seed DB\n", e);
    process.exit(1);
  }
})();
