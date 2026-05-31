import { createActor } from "@/backend";
import { useAuth } from "@/contexts/AuthContext";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { Link, createRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/size-guide",
  component: SizeGuidePage,
});

// --- Size Guide Data ---

const sizeRows = [
  {
    size: "XS",
    waistIn: '28"',
    waistCm: "71",
    hipIn: '35"',
    hipCm: "89",
    inseamIn: '29"',
    inseamCm: "74",
  },
  {
    size: "S",
    waistIn: '30"',
    waistCm: "76",
    hipIn: '37"',
    hipCm: "94",
    inseamIn: '30"',
    inseamCm: "76",
  },
  {
    size: "M",
    waistIn: '32"',
    waistCm: "81",
    hipIn: '39"',
    hipCm: "99",
    inseamIn: '30"',
    inseamCm: "76",
  },
  {
    size: "L",
    waistIn: '34"',
    waistCm: "86",
    hipIn: '41"',
    hipCm: "104",
    inseamIn: '31"',
    inseamCm: "79",
  },
  {
    size: "XL",
    waistIn: '36"',
    waistCm: "91",
    hipIn: '43"',
    hipCm: "109",
    inseamIn: '31"',
    inseamCm: "79",
  },
  {
    size: "XXL",
    waistIn: '38"',
    waistCm: "97",
    hipIn: '45"',
    hipCm: "114",
    inseamIn: '32"',
    inseamCm: "81",
  },
];

const careInstructions = [
  {
    icon: "\u2726",
    title: "Cold Wash Only",
    desc: "Machine wash at 30\u00b0C with like colours to preserve the rare cotton fibres.",
  },
  {
    icon: "\u2726",
    title: "Lay Flat to Dry",
    desc: "Reshape while damp and dry away from direct sunlight to retain the drape.",
  },
  {
    icon: "\u2726",
    title: "Steam, Never Iron",
    desc: "Use a garment steamer to release creases \u2014 heat plates damage the hand-stitched logo.",
  },
  {
    icon: "\u2726",
    title: "Dry Clean for Preservation",
    desc: "For long-term garment care, professional dry cleaning is recommended.",
  },
];

// --- Quiz Data ---

type QuizAnswer = string;
type Answers = Record<number, QuizAnswer>;

interface QuizStep {
  id: number;
  question: string;
  subtitle: string;
  options: { label: string; value: string }[];
}

const cmShort = "165 cm";
const cmMedHigh = "175 cm";
const cmTallHigh = "185 cm";

const quizSteps: QuizStep[] = [
  {
    id: 0,
    question: "What is your height?",
    subtitle: "This helps us align the inseam to your natural frame.",
    options: [
      { label: `Under 5'5" (${cmShort})`, value: "short" },
      { label: `5'5" \u2013 5'9" (165\u2013${cmMedHigh})`, value: "medium" },
      { label: `5'10" \u2013 6'1" (178\u2013${cmTallHigh})`, value: "tall" },
      { label: "Over 6'1\" (185 cm+)", value: "very_tall" },
    ],
  },
  {
    id: 1,
    question: "How would you describe your build?",
    subtitle:
      "Your frame determines how our cuts sit across the seat and thighs.",
    options: [
      { label: "Lean \u0026 Slender", value: "lean" },
      { label: "Athletic \u0026 Defined", value: "athletic" },
      { label: "Average \u0026 Balanced", value: "average" },
      { label: "Broad \u0026 Solid", value: "broad" },
    ],
  },
  {
    id: 2,
    question: "What is your body shape?",
    subtitle: "The silhouette you carry most naturally.",
    options: [
      { label: "Straight \u2014 waist & hips align", value: "straight" },
      { label: "Tapered \u2014 shoulders wider than hips", value: "tapered" },
      { label: "Oval \u2014 fuller through the middle", value: "oval" },
      { label: "Pear \u2014 hips wider than waist", value: "pear" },
    ],
  },
  {
    id: 3,
    question: "How do you usually prefer your pants to fit?",
    subtitle: "What feels right when you put them on.",
    options: [
      { label: "Slim \u2014 close to the body throughout", value: "slim" },
      {
        label: "Tailored \u2014 fitted at top, tapered below",
        value: "tailored",
      },
      { label: "Relaxed \u2014 easy through hip and thigh", value: "relaxed" },
      { label: "Wide-leg \u2014 generous from hip to hem", value: "wide" },
    ],
  },
  {
    id: 4,
    question: "What occasions do you dress for most?",
    subtitle: "Our collections span the full spectrum of elegance.",
    options: [
      { label: "Formal & Business", value: "formal" },
      { label: "Casual & Weekend", value: "casual" },
      { label: "Both equally", value: "both" },
      { label: "Occasion dressing & Events", value: "occasion" },
    ],
  },
  {
    id: 5,
    question: "Where is comfort most critical for you?",
    subtitle: "We calibrate every seam around your priority.",
    options: [
      { label: "Waistband \u2014 stays put all day", value: "waist" },
      { label: "Leg room \u2014 free movement through thighs", value: "leg" },
      { label: "Length \u2014 never bunching at the ankle", value: "length" },
      { label: "All equally \u2014 the full experience", value: "all" },
    ],
  },
  {
    id: 6,
    question: "When sizing with luxury brands, do you typically?",
    subtitle:
      "Your history with premium tailoring guides our final calibration.",
    options: [
      { label: "Size down \u2014 I run large", value: "size_down" },
      { label: "True to size always", value: "true" },
      { label: "Size up \u2014 I run slim", value: "size_up" },
      { label: "Varies by cut and brand", value: "varies" },
    ],
  },
];

// --- Size Calculation ---

type SizeKey = "XS" | "S" | "M" | "L" | "XL" | "XXL";

const bodyTypeLabels: Record<string, string> = {
  lean: "Lean & Slender",
  athletic: "Athletic & Defined",
  average: "Average & Balanced",
  broad: "Broad & Solid",
  straight: "Straight",
  tapered: "Tapered",
  oval: "Oval",
  pear: "Pear",
};

const fitPrefLabels: Record<string, string> = {
  slim: "Slim Fit",
  tailored: "Tailored Fit",
  relaxed: "Relaxed Fit",
  wide: "Wide-Leg Fit",
};

const fitDescriptions: Record<string, string> = {
  slim: "Our tailors recommend a slim silhouette that moves with you \u2014 close through the hip and tapered elegantly to the ankle.",
  tailored:
    "A refined tailored cut flatters your frame: precise at the seat, tapering gracefully through the leg.",
  relaxed:
    "An elevated ease through the hip and thigh \u2014 the modern gentleman\u2019s preference for all-day sophistication.",
  wide: "A generous wide-leg drape that commands presence \u2014 sculpted fabric that flows with every step.",
};

interface QuizResult {
  size: SizeKey;
  confidence: number;
  bodyType: string;
  fitPref: string;
  description: string;
}

function calcResult(answers: Answers): QuizResult {
  let score = 0;
  if (answers[0] === "short") score -= 1;
  if (answers[0] === "tall") score += 1;
  if (answers[0] === "very_tall") score += 2;
  if (answers[1] === "lean") score -= 1;
  if (answers[1] === "average") score += 1;
  if (answers[1] === "broad") score += 2;
  if (answers[2] === "pear" || answers[2] === "oval") score += 1;
  if (answers[6] === "size_down") score += 1;
  if (answers[6] === "size_up") score -= 1;

  const sizeOrder: SizeKey[] = ["XS", "S", "M", "L", "XL", "XXL"];
  const idx = Math.min(Math.max(score + 2, 0), 5);
  const size = sizeOrder[idx];
  const confidence = answers[6] === "varies" ? 78 : 92;

  const buildLabel = bodyTypeLabels[answers[1]] ?? answers[1];
  const shapeLabel = bodyTypeLabels[answers[2]] ?? answers[2];
  const bodyType = `${buildLabel}, ${shapeLabel}`;
  const fitPref = fitPrefLabels[answers[3]] ?? answers[3];
  const description =
    fitDescriptions[answers[3]] ??
    "A bespoke fit calibrated to your unique proportions.";

  return { size, confidence, bodyType, fitPref, description };
}

// --- Component ---

type QuizState = "idle" | "active" | "complete";

export default function SizeGuidePage() {
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const saveMutation = useMutation({
    mutationFn: async (params: {
      recommendedSize: string;
      confidenceScore: bigint;
      bodyType: string;
      fitPreference: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveFitQuizResult(params);
    },
    onSuccess: () => toast.success("Your fit profile has been saved."),
    onError: () => toast.error("Could not save your result. Please try again."),
  });

  function startQuiz() {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
    setQuizState("active");
  }

  async function selectAnswer(value: QuizAnswer) {
    const updated = { ...answers, [currentStep]: value };
    setAnswers(updated);

    if (currentStep < quizSteps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      const res = calcResult(updated);
      setResult(res);
      setQuizState("complete");

      if (isAuthenticated) {
        saveMutation.mutate({
          recommendedSize: res.size,
          confidenceScore: BigInt(res.confidence),
          bodyType: res.bodyType,
          fitPreference: res.fitPref,
        });
      }
    }
  }

  function goBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  const step = quizSteps[currentStep];
  const progress = (currentStep / quizSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card border-b border-border py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="tracking-luxury text-xs text-accent mb-4"
        >
          The Atelier Standard
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl text-foreground mb-5"
        >
          Size Guide &amp; Fit Atelier
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-muted-foreground text-luxury max-w-xl mx-auto text-lg"
        >
          Precision measurements and a personalised fit consultation &#8212;
          because a garment of this calibre deserves nothing less.
        </motion.p>
      </section>

      {/* Size Guide Table */}
      <section
        data-ocid="size-guide.section"
        className="py-20 px-4 max-w-5xl mx-auto"
      >
        <div className="text-center mb-14">
          <p className="tracking-luxury text-xs text-accent mb-3">
            Measurement Reference
          </p>
          <h2 className="font-display text-4xl text-foreground">
            Sizing Chart
          </h2>
        </div>

        <div className="overflow-x-auto rounded-sm shadow-luxury mb-16">
          <table
            className="w-full border-collapse bg-card"
            data-ocid="size-guide.table"
          >
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-6 py-4 text-left tracking-luxury text-xs font-normal">
                  Size
                </th>
                <th className="px-6 py-4 text-center tracking-luxury text-xs font-normal">
                  Waist
                </th>
                <th className="px-6 py-4 text-center tracking-luxury text-xs font-normal">
                  Hip
                </th>
                <th className="px-6 py-4 text-center tracking-luxury text-xs font-normal">
                  Inseam
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeRows.map((row, i) => (
                <tr
                  key={row.size}
                  className={`border-b border-border transition-luxury hover:bg-secondary/50 ${
                    i % 2 === 0 ? "bg-card" : "bg-background"
                  }`}
                >
                  <td className="px-6 py-5">
                    <span className="font-display text-xl text-accent">
                      {row.size}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-foreground font-medium">
                      {row.waistIn}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      / {row.waistCm} cm
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-foreground font-medium">
                      {row.hipIn}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      / {row.hipCm} cm
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-foreground font-medium">
                      {row.inseamIn}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      / {row.inseamCm} cm
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Tip */}
        <div className="bg-card border border-accent/25 rounded-sm p-8 mb-16 text-center shadow-subtle">
          <p className="tracking-luxury text-xs text-accent mb-3">
            How to Measure
          </p>
          <p className="text-muted-foreground text-luxury max-w-2xl mx-auto">
            Use a soft tape measure. For the waist, measure around the narrowest
            point. For the hip, stand with feet together and measure around the
            fullest part. Inseam is measured from the crotch seam to the desired
            hem length.
          </p>
        </div>

        {/* Fabric Care */}
        <div className="text-center mb-10">
          <p className="tracking-luxury text-xs text-accent mb-3">
            Garment Preservation
          </p>
          <h2 className="font-display text-4xl text-foreground">Fabric Care</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {careInstructions.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-sm p-7 shadow-subtle"
            >
              <span className="text-accent text-lg mb-3 block">{c.icon}</span>
              <h3 className="font-display text-xl text-foreground mb-2">
                {c.title}
              </h3>
              <p className="text-muted-foreground text-sm text-luxury">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-accent/20" />

      {/* Fit Quiz */}
      <section data-ocid="fit-quiz.section" className="py-24 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="tracking-luxury text-xs text-accent mb-3">
              Personalised Fit Consultation
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              The Fit Atelier
            </h2>
            <p className="text-muted-foreground text-luxury">
              Seven questions. One perfect size. Curated for you by our master
              tailors.
            </p>
          </div>

          {/* Idle state */}
          {quizState === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-card border border-border rounded-sm p-12 shadow-luxury mb-8">
                <p className="text-accent text-3xl mb-6">&#9766;</p>
                <p className="text-foreground text-luxury mb-8 text-lg">
                  Our fit consultation blends your body proportions, lifestyle,
                  and personal preferences to recommend the size that will feel
                  like it was made for you alone.
                </p>
                <button
                  type="button"
                  data-ocid="fit-quiz.start_button"
                  onClick={startQuiz}
                  className="inline-block px-12 py-4 bg-primary text-primary-foreground tracking-luxury text-xs rounded-sm transition-luxury hover:opacity-90 shadow-luxury"
                >
                  Begin Your Consultation
                </button>
              </div>
            </motion.div>
          )}

          {/* Active quiz */}
          {quizState === "active" && step && (
            <div data-ocid="fit-quiz.quiz_panel">
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="tracking-luxury text-xs text-muted-foreground">
                    Question {currentStep + 1} of {quizSteps.length}
                  </span>
                  <span className="tracking-luxury text-xs text-accent">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="h-0.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="bg-card border border-border rounded-sm p-10 shadow-luxury"
                >
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                    {step.question}
                  </h3>
                  <p className="text-muted-foreground text-sm text-luxury mb-8">
                    {step.subtitle}
                  </p>

                  <div className="space-y-3">
                    {step.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        data-ocid={`fit-quiz.option.${opt.value}`}
                        onClick={() => selectAnswer(opt.value)}
                        className={`w-full text-left px-6 py-4 border rounded-sm transition-luxury text-sm ${
                          answers[currentStep] === opt.value
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-background text-foreground hover:border-accent/60 hover:bg-secondary/50"
                        }`}
                      >
                        <span className="mr-3 text-accent">&#9766;</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      data-ocid="fit-quiz.back_button"
                      className="mt-6 text-muted-foreground text-xs tracking-luxury hover:text-foreground transition-smooth"
                    >
                      &#8592; Previous Question
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Results */}
          {quizState === "complete" && result && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                data-ocid="fit-quiz.results_panel"
              >
                <div className="bg-card border border-accent/30 rounded-sm p-12 shadow-elevated text-center mb-8">
                  <p className="tracking-luxury text-xs text-accent mb-6">
                    Your Recommended Size
                  </p>
                  <p className="font-display text-8xl text-primary mb-4 leading-none">
                    {result.size}
                  </p>

                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-accent/20" />
                    <p className="tracking-luxury text-xs text-accent">
                      {result.confidence}% Confidence Match
                    </p>
                    <div className="h-px flex-1 bg-accent/20" />
                  </div>

                  <div className="max-w-xs mx-auto mb-8">
                    <div className="h-1 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.3,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-foreground text-luxury mb-6 max-w-lg mx-auto">
                    {result.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 text-left">
                    <div className="bg-background border border-border rounded-sm p-4">
                      <p className="tracking-luxury text-xs text-muted-foreground mb-1">
                        Body Profile
                      </p>
                      <p className="text-foreground text-sm">
                        {result.bodyType}
                      </p>
                    </div>
                    <div className="bg-background border border-border rounded-sm p-4">
                      <p className="tracking-luxury text-xs text-muted-foreground mb-1">
                        Preferred Fit
                      </p>
                      <p className="text-foreground text-sm">
                        {result.fitPref}
                      </p>
                    </div>
                  </div>

                  {!isAuthenticated && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      data-ocid="fit-quiz.auth_prompt"
                      className="bg-secondary/50 border border-accent/20 rounded-sm p-5 mb-6 text-sm text-muted-foreground"
                    >
                      <span className="text-accent mr-2">&#9766;</span>
                      <Link
                        to="/account/login"
                        data-ocid="fit-quiz.signin_link"
                        className="text-accent hover:underline underline-offset-2"
                      >
                        Sign in
                      </Link>{" "}
                      to save your size to your profile &#8212; so every visit
                      feels like we know you.
                    </motion.div>
                  )}

                  {saveMutation.isPending && (
                    <p
                      data-ocid="fit-quiz.loading_state"
                      className="text-muted-foreground text-xs tracking-luxury mb-4"
                    >
                      Saving your fit profile&#8230;
                    </p>
                  )}

                  <button
                    type="button"
                    data-ocid="fit-quiz.retake_button"
                    onClick={startQuiz}
                    className="px-10 py-3 border border-primary text-primary tracking-luxury text-xs rounded-sm transition-luxury hover:bg-primary hover:text-primary-foreground"
                  >
                    Take Quiz Again
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to="/collections"
                    data-ocid="fit-quiz.shop_link"
                    className="inline-block px-12 py-4 bg-primary text-primary-foreground tracking-luxury text-xs rounded-sm transition-luxury hover:opacity-90 shadow-luxury"
                  >
                    Shop Your Size
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
