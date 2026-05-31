import { LOOKBOOK_STORIES, type LookbookStory } from "@/data/lookbook";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import { Route as rootRoute } from "../__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lookbook",
  component: LookbookIndexPage,
});

const CATEGORY_COLORS: Record<string, string> = {
  "Artisan Process": "bg-accent/20 text-accent border-accent/30",
  Editorial: "bg-primary/10 text-primary border-primary/20",
  "Collection Story": "bg-muted text-muted-foreground border-border",
  "Behind the Craft": "bg-secondary text-secondary-foreground border-border",
};

function StoryCard({ story, index }: { story: LookbookStory; index: number }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      data-ocid={`lookbook.story_card.${index + 1}`}
      className="group cursor-pointer bg-card border border-border rounded-sm overflow-hidden shadow-subtle hover:shadow-elevated transition-luxury text-left w-full"
      onClick={() =>
        navigate({ to: "/lookbook/$storyId", params: { storyId: story.id } })
      }
      aria-label={`Read: ${story.title}`}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover image-luxury group-hover:scale-105 transition-luxury"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        {/* Category badge */}
        <span
          className={`absolute top-4 left-4 text-[10px] tracking-luxury px-3 py-1 rounded-full border backdrop-blur-sm ${
            CATEGORY_COLORS[story.category] ??
            "bg-muted text-muted-foreground border-border"
          }`}
        >
          {story.category}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h2 className="font-display text-xl text-foreground leading-snug mb-2 group-hover:text-accent transition-luxury line-clamp-2">
          {story.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {story.excerpt}
        </p>
        <div className="flex items-center gap-5 text-[11px] tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {story.publishedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {story.readTime} min read
          </span>
        </div>
      </div>
    </button>
  );
}

function LookbookIndexPage() {
  const featured = LOOKBOOK_STORIES[0];
  const remaining = LOOKBOOK_STORIES.slice(1);
  const navigate = useNavigate();

  return (
    <div data-ocid="lookbook.page" className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center image-luxury opacity-20"
          style={{ backgroundImage: `url(${featured.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />
        <div className="relative max-w-screen-xl mx-auto px-8 md:px-16 py-28 md:py-40 flex flex-col items-center text-center">
          <p className="tracking-luxury text-[10px] text-accent mb-6 animate-fade-in">
            Velour Maison
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-primary-foreground leading-none mb-6 animate-fade-up">
            The Lookbook
          </h1>
          <p className="text-base text-primary-foreground/60 max-w-lg leading-relaxed animate-fade-up">
            Stories from the workshop, the field, and the editorial room. Each
            piece an act of devotion to the art of the extraordinary trouser.
          </p>
          <div className="mt-4 w-16 h-px bg-accent" />
        </div>
      </section>

      {/* Featured story */}
      <section className="bg-background">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 pt-20 pb-8">
          <p className="tracking-luxury text-[10px] text-muted-foreground mb-8">
            Featured Story
          </p>
          <button
            type="button"
            data-ocid="lookbook.featured_card"
            className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-0 bg-card border border-border rounded-sm overflow-hidden shadow-luxury hover:shadow-elevated transition-luxury text-left w-full"
            onClick={() =>
              navigate({
                to: "/lookbook/$storyId",
                params: { storyId: featured.id },
              })
            }
            aria-label={`Read: ${featured.title}`}
          >
            <div className="relative overflow-hidden aspect-video md:aspect-auto min-h-[320px]">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover image-luxury group-hover:scale-105 transition-luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/30" />
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span
                className={`inline-block self-start text-[10px] tracking-luxury px-3 py-1 rounded-full border mb-6 ${
                  CATEGORY_COLORS[featured.category] ??
                  "bg-muted text-muted-foreground border-border"
                }`}
              >
                {featured.category}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground leading-snug mb-4 group-hover:text-accent transition-luxury">
                {featured.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-5 text-[11px] tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {featured.publishedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {featured.readTime} min read
                </span>
              </div>
              <div className="mt-8">
                <span className="tracking-luxury text-[10px] text-accent border-b border-accent pb-0.5">
                  Read the story
                </span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Grid of remaining stories */}
      <section className="bg-background">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-16">
          <p className="tracking-luxury text-[10px] text-muted-foreground mb-8">
            All Stories
          </p>
          <div
            data-ocid="lookbook.stories_grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
          >
            {remaining.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial coda */}
      <section className="bg-primary/5 border-t border-border py-20">
        <div className="max-w-screen-md mx-auto px-8 text-center">
          <p className="font-display italic text-2xl text-foreground/80 leading-relaxed">
            &ldquo;We do not make clothes. We make the evidence of a commitment
            to perfection.&rdquo;
          </p>
          <p className="tracking-luxury text-[10px] text-muted-foreground mt-6">
            Velour Maison — Maison Principles
          </p>
        </div>
      </section>
    </div>
  );
}
