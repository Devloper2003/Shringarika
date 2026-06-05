'use client';

import SiteLayout from '@/components/shringarika/SiteLayout';
import HeroSection from '@/components/shringarika/HeroSection';
import BrandStory from '@/components/shringarika/BrandStory';
import Collections from '@/components/shringarika/Collections';
import Bespoke from '@/components/shringarika/Bespoke';
import Lookbook from '@/components/shringarika/Lookbook';
import TestimonialsAndJournal from '@/components/shringarika/TestimonialsAndJournal';
import Appointments from '@/components/shringarika/Appointments';
import InstagramSection from '@/components/shringarika/InstagramSection';
import Contact from '@/components/shringarika/Contact';
import LoadingScreen from '@/components/shringarika/LoadingScreen';

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4 bg-ivory">
      <div className="flex items-center gap-4">
        <div className="w-12 h-[1px] bg-zari-gold/20" />
        <span className="text-zari-gold/30 text-xs">✦</span>
        <div className="w-12 h-[1px] bg-zari-gold/20" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SiteLayout>
      <LoadingScreen />
      <HeroSection />

      {/* Brand Story Teaser Line */}
      <div className="bg-ivory py-8 text-center">
        <p className="font-cormorant text-lg sm:text-xl text-noir/60 italic max-w-2xl mx-auto px-4">
          Not just a fashion brand — but a deeply personal, cinematic couture experience 
          where every woman walks into her most beautiful story.
        </p>
        <div className="w-12 h-[1px] bg-zari-gold/40 mx-auto mt-4" />
      </div>

      <SectionDivider />
      <BrandStory />
      <SectionDivider />
      <Collections />
      <SectionDivider />
      <Bespoke />
      <SectionDivider />
      <Lookbook />
      <SectionDivider />
      <TestimonialsAndJournal />
      <SectionDivider />
      <Appointments />
      <SectionDivider />
      <InstagramSection />
      <SectionDivider />
      <Contact />
    </SiteLayout>
  );
}
