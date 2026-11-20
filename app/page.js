import { getPublic } from "@/lib/publicApi";
import Hero from "@/components/home/Hero";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import PricingSection from "@/components/home/PricingSection";
import HowItWorks from "@/components/home/HowItWorks";
import SubjectsAndStats from "@/components/home/SubjectsAndStats";
import Testimonials from "@/components/home/Testimonials";

export default async function Home() {
  const [latest, statsData] = await Promise.all([
    getPublic("/api/tuitions/latest"),
    getPublic("/api/stats"),
  ]);

  const tuitions = latest?.tuitions || [];
  const stats = statsData || { tutors: 0, students: 0, tuitions: 0 };

  return (
    <main>
      <Hero />
      <FeaturedTuitions tuitions={tuitions} />
      <HowItWorks />
      <SubjectsAndStats stats={stats} />
      <PricingSection />
      <Testimonials />
    </main>
  );
}
