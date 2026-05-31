import { LOOKBOOK_STORIES } from "@/data/lookbook";
import { PRODUCTS } from "@/data/products";
import { createRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Copy,
} from "lucide-react";
import { useState } from "react";
import { Route as rootRoute } from "../__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lookbook/$storyId",
  component: StoryDetailPage,
});

function StoryDetailPage() {
  const { storyId } = Route.useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const storyIndex = LOOKBOOK_STORIES.findIndex((s) => s.id === storyId);
  const story = LOOKBOOK_STORIES[storyIndex];

  if (!story) {
    return (
      <div
        data-ocid="lookbook.story.error_state"
        className="min-h-screen flex flex-col items-center justify-center text-center px-8"
      >
        <p className="font-display text-3xl text-foreground mb-4">
          Story not found
        </p>
        <button
          type="button"
          data-ocid="lookbook.story.back_button"
          onClick={() => navigate({ to: "/lookbook" })}
          className="tracking-luxury text-[10px] text-accent border-b border-accent pb-0.5 hover:opacity-70 transition-luxury"
        >
          Return to Lookbook
        </button>
      </div>
    );
  }

  const prevStory = storyIndex > 0 ? LOOKBOOK_STORIES[storyIndex - 1] : null;
  const nextStory =
    storyIndex < LOOKBOOK_STORIES.length - 1
      ? LOOKBOOK_STORIES[storyIndex + 1]
      : null;

  const relatedProducts = PRODUCTS.filter((p) =>
    story.relatedProducts.includes(p.id),
  );

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div data-ocid="lookbook.story.page" className="min-h-screen">
      {/* Hero image */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover image-luxury"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/80" />

        {/* Back link */}
        <button
          type="button"
          data-ocid="lookbook.story.back_button"
          onClick={() => navigate({ to: "/lookbook" })}
          className="absolute top-8 left-8 flex items-center gap-2 tracking-luxury text-[10px] text-primary-foreground/80 hover:text-primary-foreground transition-luxury"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Lookbook
        </button>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <div className="max-w-screen-md">
            <span className="inline-block tracking-luxury text-[10px] text-accent bg-primary/60 backdrop-blur-sm border border-accent/30 px-3 py-1 rounded-full mb-4">
              {story.category}
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-primary-foreground leading-none mb-3">
              {story.title}
            </h1>
            <p className="text-base text-primary-foreground/70">
              {story.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-screen-md mx-auto px-8 md:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6 text-[11px] tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {story.publishedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {story.readTime} min read
            </span>
            <span className="hidden md:flex items-center gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground text-[10px] tracking-luxury px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
          <button
            type="button"
            data-ocid="lookbook.story.share_button"
            onClick={handleShare}
            className="flex items-center gap-2 tracking-luxury text-[10px] text-muted-foreground hover:text-accent transition-luxury"
            aria-label="Copy link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent" />
                <span className="text-accent">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Share
              </>
            )}
          </button>
        </div>
      </div>

      {/* Story content */}
      <article className="bg-background">
        <div className="max-w-screen-md mx-auto px-8 md:px-16 py-16 space-y-10">
          {story.content.map((block) => {
            if (block.type === "paragraph" && block.text) {
              return (
                <p
                  key={block.id}
                  className="text-base text-foreground/80 leading-relaxed text-luxury"
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "pullquote" && block.text) {
              return (
                <blockquote
                  key={block.id}
                  className="border-l-2 border-accent pl-8 py-2 my-12"
                >
                  <p className="font-display text-2xl md:text-3xl text-foreground italic leading-snug">
                    {block.text}
                  </p>
                </blockquote>
              );
            }
            if (block.type === "image" && block.src) {
              return (
                <figure key={block.id} className="my-12 -mx-4 md:-mx-16">
                  <img
                    src={block.src}
                    alt={block.alt ?? ""}
                    className="w-full object-cover image-luxury max-h-[540px]"
                    loading="lazy"
                  />
                  {block.caption && (
                    <figcaption className="text-[11px] tracking-wider text-muted-foreground text-center mt-3 px-4">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return null;
          })}
        </div>
      </article>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="bg-muted/30 border-t border-border">
          <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-16">
            <p className="tracking-luxury text-[10px] text-muted-foreground mb-2">
              From the Story
            </p>
            <h2 className="font-display text-2xl text-foreground mb-10">
              Pieces featured in this editorial
            </h2>
            <div
              data-ocid="lookbook.story.related_products"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {relatedProducts.map((product, i) => (
                <button
                  key={product.id}
                  type="button"
                  data-ocid={`lookbook.story.related_product.${i + 1}`}
                  className="group cursor-pointer bg-card border border-border rounded-sm overflow-hidden shadow-subtle hover:shadow-luxury transition-luxury text-left w-full"
                  onClick={() =>
                    navigate({
                      to: "/collections/products/$productId",
                      params: { productId: product.id },
                    })
                  }
                  aria-label={`View ${product.name}`}
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover image-luxury group-hover:scale-105 transition-luxury"
                      loading="lazy"
                    />
                    {product.isLimitedEdition && (
                      <span className="absolute top-3 left-3 text-[10px] tracking-luxury bg-accent/90 text-accent-foreground px-2.5 py-1 rounded-full">
                        Limited
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="tracking-luxury text-[9px] text-muted-foreground mb-1">
                      {product.collectionName}
                    </p>
                    <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-luxury mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      £{product.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      <nav
        data-ocid="lookbook.story.story_nav"
        className="bg-card border-t border-border"
        aria-label="Story navigation"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-10 grid grid-cols-2 gap-4">
          {prevStory ? (
            <button
              type="button"
              data-ocid="lookbook.story.prev_button"
              onClick={() =>
                navigate({
                  to: "/lookbook/$storyId",
                  params: { storyId: prevStory.id },
                })
              }
              className="flex flex-col gap-1 text-left group"
            >
              <span className="flex items-center gap-2 tracking-luxury text-[10px] text-muted-foreground group-hover:text-accent transition-luxury">
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="font-display text-base md:text-lg text-foreground group-hover:text-accent transition-luxury line-clamp-2">
                {prevStory.title}
              </span>
            </button>
          ) : (
            <div />
          )}
          {nextStory ? (
            <button
              type="button"
              data-ocid="lookbook.story.next_button"
              onClick={() =>
                navigate({
                  to: "/lookbook/$storyId",
                  params: { storyId: nextStory.id },
                })
              }
              className="flex flex-col gap-1 text-right items-end group"
            >
              <span className="flex items-center gap-2 tracking-luxury text-[10px] text-muted-foreground group-hover:text-accent transition-luxury">
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="font-display text-base md:text-lg text-foreground group-hover:text-accent transition-luxury line-clamp-2">
                {nextStory.title}
              </span>
            </button>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
}
