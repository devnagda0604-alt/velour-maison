export type LookbookCategory =
  | "Artisan Process"
  | "Editorial"
  | "Collection Story"
  | "Behind the Craft";

export interface LookbookContentBlock {
  id: string;
  type: "paragraph" | "image" | "pullquote";
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface LookbookStory {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  publishedDate: string;
  category: LookbookCategory;
  readTime: number;
  excerpt: string;
  content: LookbookContentBlock[];
  tags: string[];
  relatedProducts: string[];
}

export const LOOKBOOK_STORIES: LookbookStory[] = [
  {
    id: "the-art-of-6000-stitches",
    title: "The Art of 6,000 Stitches",
    subtitle: "Inside the atelier where every logo is a labour of devotion",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    publishedDate: "April 2025",
    category: "Artisan Process",
    readTime: 7,
    excerpt:
      "In a sunlit workshop in Naples, master embroiderer Carmine Esposito has spent 34 years perfecting a singular art. We spent three days watching him work.",
    content: [
      {
        id: "s1-p1",
        type: "paragraph",
        text: "The needle moves with impossible precision. Carmine Esposito does not look at his hands — he knows where they are. After 34 years of hand-embroidery in the same Naples workshop, his fingers carry the memory of every stitch. On the workbench before him lies a single pair of Velour Maison Midnight Sovereign trousers. The VM monogram, barely 4 centimetres wide, will take him eleven hours to complete.",
      },
      {
        id: "s1-q1",
        type: "pullquote",
        text: "\u201cA machine can place ten thousand stitches a minute. I place six thousand in a day. That is the difference between manufacturing and art.\u201d",
      },
      {
        id: "s1-i1",
        type: "image",
        src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80",
        alt: "Artisan hands working on fabric embroidery detail",
        caption:
          "Each VM monogram requires 6,000 individual hand-placed stitches in 24-carat gold thread.",
      },
      {
        id: "s1-p2",
        type: "paragraph",
        text: "The thread itself is an extraordinary material. Sourced from a single supplier in Lyon who produces it for only three maisons in the world, it is 95% pure gold — spun to a gauge so fine it requires specialist tweezers to handle. A single spool contains enough thread for precisely four monograms. Carmine receives them wrapped in acid-free tissue and stores them in a cedar cabinet away from direct light.",
      },
      {
        id: "s1-p3",
        type: "paragraph",
        text: "The pattern for each monogram was drawn by hand in 1987 by Carmine\u2019s late mentor, Salvatore Ricci, who spent months perfecting the letterforms before committing them to a grid of 6,000 reference points. The grid has never been digitised. It exists only on a laminated sheet of graph paper, taped to the edge of Carmine\u2019s workbench, slightly yellowed, irreplaceable.",
      },
      {
        id: "s1-q2",
        type: "pullquote",
        text: '\u201cEvery garment that leaves here carries a small piece of Salvatore with it. That is not sentimentality — that is continuity."',
      },
      {
        id: "s1-p4",
        type: "paragraph",
        text: "When asked how he knows when a piece is finished, Carmine sets down his needle and looks up for the first time. \u201cWhen I cannot improve it further,\u201d he says. \u201cNot when the stitches are complete. When I cannot do better.\u201d He returns to his work. The needle resumes its quiet rhythm.",
      },
    ],
    tags: ["Artisan", "Craft", "Naples", "Embroidery"],
    relatedProducts: ["atelier-midnight-sovereign", "atelier-charcoal-envoy"],
  },
  {
    id: "cotton-from-the-edge-of-the-world",
    title: "Cotton from the Edge of the World",
    subtitle:
      "A 40-hectare valley in the Peruvian highlands produces the rarest fabric on earth",
    coverImage:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1600&q=80",
    publishedDate: "March 2025",
    category: "Behind the Craft",
    readTime: 9,
    excerpt:
      "At 3,400 metres above sea level, where the air is too thin for conventional agriculture, a single family has cultivated the world\u2019s most extraordinary cotton for six generations.",
    content: [
      {
        id: "s2-p1",
        type: "paragraph",
        text: "The valley has no name on any official map. The Quispe family calls it La Reserva — the reserve. At 3,400 metres above sea level in the Peruvian Andes, it is 40 hectares of microclimate so precise that no other cotton in the world grows with the same fibre length, the same softness against skin, the same quiet weight. Velour Maison holds the exclusive global contract for 100% of its annual yield.",
      },
      {
        id: "s2-i1",
        type: "image",
        src: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200&q=80",
        alt: "Fields of premium cotton at high altitude",
        caption:
          "La Reserva produces no more than 240 kilograms of finished cotton per season — enough for fewer than 60 garments.",
      },
      {
        id: "s2-q1",
        type: "pullquote",
        text: '\u201cWe do not harvest when the calendar says. We harvest when the cotton tells us it is ready."',
      },
      {
        id: "s2-p2",
        type: "paragraph",
        text: "Marcos Quispe, fifth generation, rises at 4am every morning of harvest season to walk the rows. He is reading the fibres — testing the resistance between his thumb and forefinger, checking for the exact moment of peak maturity. The window is approximately three days. Miss it, and the cotton ages. The yield is smaller than a large swimming pool. There are no second chances.",
      },
      {
        id: "s2-p3",
        type: "paragraph",
        text: "The 340gsm weight that defines our Atelier pieces is a direct result of La Reserva\u2019s altitude. The slow-growing, cold-stressed fibres produce a cotton of extraordinary density without heaviness — a contradiction that our master weavers in Porto spent two years learning to work with. The resulting fabric breathes like linen but falls like silk.",
      },
    ],
    tags: ["Peru", "Cotton", "Provenance", "Material"],
    relatedProducts: [
      "atelier-midnight-sovereign",
      "atelier-ivory-chancellor",
      "atelier-dusk-marquis",
    ],
  },
  {
    id: "dressed-in-midnight",
    title: "Dressed in Midnight",
    subtitle: "The Atelier Collection — an editorial in deep navy and gold",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
    publishedDate: "February 2025",
    category: "Editorial",
    readTime: 5,
    excerpt:
      "Shot over two evenings in a private palazzo outside Milan, our Atelier Collection editorial explores the quiet authority of a man who has nothing left to prove.",
    content: [
      {
        id: "s3-p1",
        type: "paragraph",
        text: "There is a particular kind of confidence that cannot be bought or performed. It accumulates over years of making the right choices, quietly, without announcement. The Atelier Collection was conceived for men who carry that confidence as effortlessly as they carry our trousers — which is to say, with absolute ease.",
      },
      {
        id: "s3-i1",
        type: "image",
        src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1200&q=80",
        alt: "Man in luxury navy trousers in a palazzo setting",
        caption:
          "The Midnight Sovereign in deep navy. Available in sizes S\u2013XL. Only 12 pairs remain.",
      },
      {
        id: "s3-q1",
        type: "pullquote",
        text: '\u201cWe did not design these for any occasion. We designed them for the man who decides what the occasion is."',
      },
      {
        id: "s3-i2",
        type: "image",
        src: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=80",
        alt: "Close-up of embroidered VM monogram on navy fabric",
        caption:
          "The VM monogram in 24-carat gold thread. 6,000 individual hand-placed stitches.",
      },
      {
        id: "s3-p2",
        type: "paragraph",
        text: 'The shoot was photographed by Alessandro Ferrara, who spent three weeks in pre-production selecting the light conditions, the architecture, and the precise shade of evening sky he required as context. The palazzo, owned by a collector who prefers anonymity, had not been photographed since 1994. Ferrara describes it as \u201cthe only interior I know where the clothes do not fight with the room."',
      },
    ],
    tags: ["Editorial", "Atelier", "Navy", "Milan"],
    relatedProducts: ["atelier-midnight-sovereign", "atelier-charcoal-envoy"],
  },
  {
    id: "the-heritage-of-patience",
    title: "The Heritage of Patience",
    subtitle:
      "Four generations of Neapolitan tailoring, and why we will never change the pattern",
    coverImage:
      "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=1600&q=80",
    publishedDate: "January 2025",
    category: "Collection Story",
    readTime: 8,
    excerpt:
      "In 1947, Enzo Palazzo drew a trouser pattern that changed everything. Seventy-eight years later, not a single line of it has been altered. We went to Naples to find out why.",
    content: [
      {
        id: "s4-p1",
        type: "paragraph",
        text: 'The original pattern lives in a flat wooden drawer beneath the cutting table. It is drawn on cartridge paper in graphite pencil, the lines still sharp after nearly eight decades. The drawer is not locked. The Palazzo family does not believe in locks for things of true value. \u201cIf someone wanted to copy it,\u201d says fourth-generation tailor Giovanni Palazzo, \u201cthey would also need to copy forty years of learning how to execute it."',
      },
      {
        id: "s4-i1",
        type: "image",
        src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80",
        alt: "Tailor working on fabric pattern in a traditional workshop",
        caption:
          "Giovanni Palazzo cuts each Heritage piece from the 1947 original pattern. The cutting table has not moved in 60 years.",
      },
      {
        id: "s4-q1",
        type: "pullquote",
        text: '\u201cMy grandfather drew this pattern for men who wanted to be remembered. Not famous. Remembered."',
      },
      {
        id: "s4-p2",
        type: "paragraph",
        text: "The Heritage Collection\u2019s distinctive fall — that unhurried drape that settles perfectly without adjustment — is a product of a single geometric decision Enzo made in 1947: a half-degree increase in the back rise angle. It is invisible to the untrained eye. It is everything to the body wearing it. Giovanni has been asked, more than once, to modify it for contemporary silhouettes. He has declined every time.",
      },
      {
        id: "s4-p3",
        type: "paragraph",
        text: "\u201cSome things work because they have not been improved,\u201d he says. \u201cThe pattern is not old-fashioned. It is resolved.\u201d",
      },
    ],
    tags: ["Heritage", "Naples", "Tailoring", "History"],
    relatedProducts: ["heritage-venetian-dusk", "heritage-london-grey"],
  },
  {
    id: "the-comfort-manifesto",
    title: "The Comfort Manifesto",
    subtitle:
      "Why luxury and comfort were never opposites — and what we did about it",
    coverImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80",
    publishedDate: "December 2024",
    category: "Collection Story",
    readTime: 6,
    excerpt:
      "The fashion industry told us for decades that you could have beauty or comfort, but not both. We rejected that premise entirely. This is the story of how the Comfort Collection was born.",
    content: [
      {
        id: "s5-p1",
        type: "paragraph",
        text: "The idea arrived during a fitting. A client — a diplomat, a man accustomed to wearing exceptional clothes — put on a pair of our Atelier trousers, looked in the mirror, and said: \u201cPerfect. And completely exhausting.\u201d He meant it as a compliment. We heard it as a problem. If a garment this beautiful demanded effort to inhabit, something was wrong.",
      },
      {
        id: "s5-q1",
        type: "pullquote",
        text: '\u201cWe spent eighteen months asking what comfort actually means in the context of extreme luxury. The answer surprised us."',
      },
      {
        id: "s5-i1",
        type: "image",
        src: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=1200&q=80",
        alt: "Luxurious fabric close-up with soft texture detail",
        caption:
          "The tri-annual harvest cotton used in Cloud Nine. Harvested once every three years for maximum fibre length.",
      },
      {
        id: "s5-p2",
        type: "paragraph",
        text: "The Comfort Collection required us to source a new cotton entirely — the tri-annual harvest variety used in Cloud Nine, which grows so slowly that its fibres develop a natural elasticity no mechanical process can replicate. The result is a trouser with the same visual authority as our Atelier line, but which moves with the body rather than against it. The waistband applies zero pressure. The leg traces without constraint.",
      },
      {
        id: "s5-p3",
        type: "paragraph",
        text: "Our head of product development, who had spent 22 years in luxury tailoring before joining us, wore a prototype for three days before filing his notes. His single-sentence verdict: \u201cFor the first time in my career, I forgot I was wearing trousers.\u201d We put that in the brief. We used it as the standard against which every iteration was measured.",
      },
    ],
    tags: ["Comfort", "Innovation", "Philosophy", "Cotton"],
    relatedProducts: ["comfort-cloud-nine", "comfort-navy-ease"],
  },
];
