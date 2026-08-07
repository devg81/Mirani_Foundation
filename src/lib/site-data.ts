import heroHealth from "@/assets/hero-health.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroJustice from "@/assets/hero-justice.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export const heroSlides = [
  {
    image: heroHealth,
    eyebrow: "Health",
    title: "Bringing healthcare to every doorstep.",
    subtitle:
      "Free medical camps, maternal care, and preventive health programs across underserved communities.",
    cta: { label: "See our health work", href: "/blogs?category=campaign" },
  },
  {
    image: heroEducation,
    eyebrow: "Education",
    title: "A classroom for every child.",
    subtitle:
      "Scholarships, learning centres, and teacher training that put learning within reach of every child.",
    cta: { label: "Explore programs", href: "/about" },
  },
  {
    image: heroJustice,
    eyebrow: "Social Justice",
    title: "Standing up for dignity and rights.",
    subtitle:
      "Advocacy, legal aid, and awareness — building a fairer future alongside the communities we serve.",
    cta: { label: "Join the movement", href: "/contact" },
  },
];

export const impactStats = [
  { label: "Campaigns", value: 128, suffix: "+" },
  { label: "Lives Affected", value: 92000, suffix: "+" },
  { label: "Stories Created", value: 340, suffix: "" },
  { label: "Donors", value: 5200, suffix: "+" },
];

export type Campaign = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Health" | "Education" | "Social Justice";
  image: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "monsoon-medical-camp",
    title: "Monsoon Medical Camp — Rural Maharashtra",
    excerpt:
      "Free health checkups, medicines and maternal counselling for over 2,400 villagers across 12 sites.",
    category: "Health",
    image: gallery3,
  },
  {
    slug: "learning-lamps-scholarship",
    title: "Learning Lamps Scholarship 2025",
    excerpt:
      "Full-tuition scholarships for 180 first-generation students entering secondary school.",
    category: "Education",
    image: gallery2,
  },
  {
    slug: "voices-for-dignity",
    title: "Voices for Dignity — Women's Rights Circle",
    excerpt:
      "Legal literacy workshops and support groups for survivors of domestic violence in 6 districts.",
    category: "Social Justice",
    image: gallery4,
  },
];

export const pillars = [
  {
    title: "Health",
    image: heroHealth,
    short:
      "Medical camps, maternal care and preventive programs where healthcare is hardest to reach.",
    long:
      "We partner with local doctors, ASHA workers and hospitals to run free medical camps, immunisation drives, maternal wellness circles and long-term chronic care support. Every camp is designed with the community, not for it.",
  },
  {
    title: "Education",
    image: heroEducation,
    short:
      "Scholarships, learning centres, and teacher training that put learning within reach of every child.",
    long:
      "From after-school learning centres to full scholarships and teacher training programs, our education work is built on one belief: a child's postcode should never decide their future. We currently support 42 schools and 1,800+ learners.",
  },
  {
    title: "Social Justice",
    image: heroJustice,
    short:
      "Advocacy, legal aid, and awareness — building a fairer future alongside the communities we serve.",
    long:
      "Our social justice pillar focuses on women's rights, caste equity, and access to entitlements. Through legal literacy circles, community paralegals and awareness campaigns, we help people claim what is already theirs by law.",
  },
];

export const galleryImages = [
  { src: gallery1, caption: "Food drive, Pune district", campaign: "Monsoon Relief" },
  { src: gallery2, caption: "Learning Lamps classroom, Beed", campaign: "Learning Lamps Scholarship" },
  { src: gallery3, caption: "Free paediatric camp, Nashik", campaign: "Monsoon Medical Camp" },
  { src: gallery4, caption: "Women's tailoring cooperative", campaign: "Voices for Dignity" },
  { src: gallery5, caption: "Community sapling drive", campaign: "Green Villages" },
  { src: gallery6, caption: "Volunteers at the annual meet", campaign: "Volunteer Meet 2025" },
];

export const galleryCampaigns = [
  "All",
  "Monsoon Medical Camp",
  "Learning Lamps Scholarship",
  "Voices for Dignity",
  "Monsoon Relief",
  "Green Villages",
  "Volunteer Meet 2025",
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Campaign" | "Story" | "Press Release" | "Publication";
  date: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "monsoon-medical-camp-report",
    title: "2,400 villagers reached in our Monsoon Medical Camp",
    excerpt:
      "Twelve sites, forty-two volunteers, and a summer none of us will forget.",
    content:
      "This year's Monsoon Medical Camp brought free consultations, medicines and maternal counselling to twelve sites across rural Maharashtra. Forty-two volunteers — doctors, nurses, students — showed up over three weekends. Here's what we learned, and what comes next.",
    category: "Campaign",
    date: "2026-06-18",
    image: gallery3,
  },
  {
    slug: "priyas-scholarship-story",
    title: "\"I was the first in my family to open a textbook.\"",
    excerpt: "Priya on how a Learning Lamps scholarship changed everything.",
    content:
      "Priya, 14, is one of 180 students on our Learning Lamps scholarship this year. She writes about the day she brought her acceptance letter home — and what her mother said.",
    category: "Story",
    date: "2026-05-30",
    image: gallery2,
  },
  {
    slug: "annual-report-2025-published",
    title: "Annual Report 2025 published today",
    excerpt:
      "A full account of our year — programs, finances, and the people who made it possible.",
    content:
      "We are pleased to publish our Annual Report for FY2024-25. The report covers every program, every rupee, and every partner community.",
    category: "Press Release",
    date: "2026-04-12",
    image: gallery1,
  },
  {
    slug: "research-on-rural-maternal-care",
    title: "Research brief: gaps in rural maternal care in Marathwada",
    excerpt:
      "A field study drawn from three years of our health-camp data.",
    content:
      "This publication summarises three years of health-camp data and interviews with 240 mothers. We identify four systemic gaps and recommend three interventions.",
    category: "Publication",
    date: "2026-03-02",
    image: gallery4,
  },
  {
    slug: "voices-for-dignity-launch",
    title: "Launching Voices for Dignity across six districts",
    excerpt:
      "A new women's rights and legal literacy circle rolls out this month.",
    content:
      "Voices for Dignity is our newest social justice initiative — legal literacy circles and survivor support groups in six districts, co-led by community paralegals.",
    category: "Campaign",
    date: "2026-02-20",
    image: gallery4,
  },
  {
    slug: "volunteer-meet-2025",
    title: "Our 2025 volunteer meet, in pictures",
    excerpt: "One evening, 120 volunteers, and a whole lot of chai.",
    content:
      "We closed out the year with our annual volunteer meet. Thank you to every single person who showed up — for this evening, and for every day in between.",
    category: "Story",
    date: "2026-01-14",
    image: gallery6,
  },
];

export const teamMembers = [
  {
    name: "Dr. Anjali Mirani",
    role: "Founder & Chairperson",
    image: gallery4,
    quote:
      "We started this in a two-room clinic. Ten years later, our belief is the same — dignity is not a service, it's a right.",
  },
  {
    name: "Rahul Deshmukh",
    role: "Programs Director",
    image: gallery1,
    quote:
      "Every program we design begins with a conversation, not a spreadsheet. The community leads; we support.",
  },
  {
    name: "Meera Krishnan",
    role: "Education Lead",
    image: gallery2,
    quote:
      "When a child tells me she wants to be a doctor, I know exactly what we're working for.",
  },
  {
    name: "Farhan Sheikh",
    role: "Health Programs Lead",
    image: gallery3,
    quote:
      "Healthcare should meet people where they are — in their villages, in their language, on their schedule.",
  },
  {
    name: "Priya Nair",
    role: "Social Justice Lead",
    image: gallery5,
    quote:
      "The law already gives people rights. Our job is to make sure they can claim them.",
  },
  {
    name: "Vikram Rao",
    role: "Operations & Finance",
    image: gallery6,
    quote:
      "Every rupee we spend is a rupee someone trusted us with. That's the standard.",
  },
];

export const reports = [
  { title: "Annual Report 2024–25", year: 2025, type: "PDF" as const, size: "3.2 MB", href: "#" },
  { title: "Financial Statements 2024–25", year: 2025, type: "PDF" as const, size: "1.8 MB", href: "#" },
  { title: "Impact Study — Monsoon Medical Camps", year: 2025, type: "PDF" as const, size: "2.4 MB", href: "#" },
  { title: "Learning Lamps Cohort Data", year: 2025, type: "Excel" as const, size: "480 KB", href: "#" },
  { title: "Annual Report 2023–24", year: 2024, type: "PDF" as const, size: "3.0 MB", href: "#" },
  { title: "Volunteer Handbook", year: 2024, type: "Word" as const, size: "620 KB", href: "#" },
  { title: "Financial Statements 2023–24", year: 2024, type: "PDF" as const, size: "1.6 MB", href: "#" },
  { title: "Annual Report 2022–23", year: 2023, type: "PDF" as const, size: "2.8 MB", href: "#" },
];

export const contactInfo = {
  phone: "+91 98765 43210",
  email: "hello@miranifoundation.org",
  address: "Mirani Foundation, 14 Bhagat Singh Marg, Pune 411001, Maharashtra, India",
  bank: {
    name: "Mirani Foundation",
    account: "0123 4567 8912",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank, Pune Main Branch",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.982!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1700000000000",
};
