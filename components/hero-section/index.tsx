'use client';

import HeroShape from '@/components/hero-section/hero-shape';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { easeInOut, motion } from 'motion/react';
import { Pacifico } from 'next/font/google';
import Link from 'next/link';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

export default function HeroSection({
  badge = 'v1.0.0',
  title1 = 'Shine75',
  title2 = 'Make LeetCode become easier',
  description = 'A curated collection of LeetCode problems with solutions, with a focus on efficiency and readability.',
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: easeInOut,
      },
    }),
  };

  return (
    <div className="relative flex justify-center items-center bg-background dark:bg-black w-full h-[93vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 dark:from-primary/30 via-transparent to-rose-500/20 dark:to-rose-500/30 blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <HeroShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/70"
          className="top-[15%] md:top-[20%] left-[-10%] md:left-[-5%]"
        />

        <HeroShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-400"
          className="top-[70%] md:top-[75%] right-[-5%] md:right-[0%]"
        />

        <HeroShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-400"
          className="bottom-[5%] md:bottom-[10%] left-[5%] md:left-[10%]"
        />

        <HeroShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/70 dark:from-amber-400/90"
          className="top-[10%] md:top-[15%] right-[15%] md:right-[20%]"
        />

        <HeroShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/70 dark:from-cyan-400/90"
          className="top-[5%] md:top-[10%] left-[20%] md:left-[25%]"
        />
      </div>

      <div className="z-10 relative mx-auto px-4 md:px-6 max-w-6xl container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-card/50 shadow-sm backdrop-blur-sm mb-8 md:mb-12 px-4 py-1.5 border border-primary/30 rounded-full"
          >
            {/* <img src="/logo.webp" alt="logo" className="w-6 h-6" /> */}
            <span className="font-medium text-foreground text-sm tracking-wide">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="mx-4 mb-6 md:mb-8 font-bold text-4xl sm:text-6xl md:text-8xl tracking-tight">
              <span className="bg-clip-text bg-gradient-to-b from-foreground to-foreground/80 text-pink-500 dark:text-pink-400">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  'from-primary via-primary/90 bg-gradient-to-r to-rose-500 bg-clip-text p-4 text-transparent',
                  pacifico.className,
                  'font-bold'
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="mx-auto mb-10 px-4 max-w-xl text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex sm:flex-row flex-col justify-center gap-4"
          >
            <Button
              asChild
              className="bg-gradient-to-r from-primary hover:from-primary/90 to-rose-500 hover:to-rose-500/90 shadow-md shadow-primary/10 border-none rounded-full"
            >
              <Link href="/practice">
                Start practice
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="hover:bg-primary/5 shadow-sm border-primary/30 rounded-full"
            >
              <Link href="/docs">
                View Documentation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-black via-transparent to-background/80 dark:to-black/80 pointer-events-none" />
    </div>
  );
}
