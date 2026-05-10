"use client";

import React from "react";
import { motion } from "framer-motion";
import { Testimonials } from "../zenblocks/testimonials";

export const myTestimonials = [
  {
    text: "Amazing! It's worth visiting. I'd suggest adding a refresh button for individual components instead of refreshing the whole window.",
    name: "Rakesh Patel",
    role: "Frontend Developer Intern @ LetsLearn Asia",
    image: "https://ui-avatars.com/api/?name=Rakesh+Patel&background=6366f1&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Building your own UI library is a solid way to level up frontend architecture skills. Clean work.",
    name: "Himanshi Gangwar",
    role: "Aspiring Frontend Developer | HTML, CSS, JavaScript & React",
    image: "https://ui-avatars.com/api/?name=Himanshi+Gangwar&background=ec4899&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Hey, I also built my own frontend component library — let's connect!",
    name: "Nitin Gupta",
    role: "Building @Uilora | Full-Stack Engineer | React Native & AI/ML",
    image: "https://ui-avatars.com/api/?name=Nitin+Gupta&background=f59e0b&color=fff&size=80",
    rating: 5,
  },
  {
    text: "🔥 This is fire!",
    name: "Soumyadip Mandal",
    role: "Android Application Developer | Clean UI & Scalable Architecture",
    image: "https://ui-avatars.com/api/?name=Soumyadip+Mandal&background=ef4444&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Amazing, really wonderful! 👏",
    name: "Vishwak Koleti",
    role: "IIT Patna '28 | CS & Data Analytics | Backend Developer",
    image: "https://ui-avatars.com/api/?name=Vishwak+Koleti&background=0ea5e9&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Will this only work with TypeScript like Shadcn UI, or is it compatible with JavaScript as well?",
    name: "Saurav Singh",
    role: "Sr Web Developer | Capgemini Tech Challenge Winner 🏆 | MERN / MEVN",
    image: "https://ui-avatars.com/api/?name=Saurav+Singh&background=10b981&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Awesome bhai! I am also working on the same concept.",
    name: "Amandeep Singh",
    role: "Helping US Startups scale with Next.js & React Native",
    image: "https://ui-avatars.com/api/?name=Amandeep+Singh&background=8b5cf6&color=fff&size=80",
    rating: 5,
  },
  {
    text: "That looks really amazing! Reminds me of reactbits.dev but feels more clean, lightweight and not overwhelming.",
    name: "James Malatabon",
    role: "Senior Front-End Engineer | Web3 Explorer",
    image: "https://ui-avatars.com/api/?name=James+Malatabon&background=06b6d4&color=fff&size=80",
    rating: 5,
  },
  {
    text: "It's awesome, I will definitely try it. Are you going to launch a premium version in the future?",
    name: "Aditya Aryan",
    role: "Web Developer | Next.js | Auth.js | Shadcn UI | Prisma + PostgreSQL",
    image: "https://ui-avatars.com/api/?name=Aditya+Aryan&background=f97316&color=fff&size=80",
    rating: 5,
  },
  {
    text: "I currently use Shadcn but this looks great. Definitely checking it out — really appreciate the contribution!",
    name: "Chintan Vaghela",
    role: "Full Stack Developer | 6+ years experience | Freelancer",
    image: "https://ui-avatars.com/api/?name=Chintan+Vaghela&background=14b8a6&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Well done! I also started building something similar for the community but not at such a big scale. Great work.",
    name: "Bhupender Kumar Sharma",
    role: "SDE I @ HCLTech | Top 7% on LeetCode | Full Stack Dev",
    image: "https://ui-avatars.com/api/?name=Bhupender+Sharma&background=6366f1&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Amazing library — perfect for building visually rich websites.",
    name: "Pradeep Shukla",
    role: "Software & Web Development | React & JavaScript",
    image: "https://ui-avatars.com/api/?name=Pradeep+Shukla&background=84cc16&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Impressive. Bookmarked the website for future projects.",
    name: "Anubhab Mowar",
    role: "Founder, Vedabits | QuantResearch Consultant | IIT Madras",
    image: "https://ui-avatars.com/api/?name=Anubhab+Mowar&background=db2777&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Amazing work! I would definitely use this in my next project. 👏",
    name: "Vivek Patel",
    role: "Full-Stack Developer Intern | React, Next.js, NestJS | NSUT CSE'27",
    image: "https://ui-avatars.com/api/?name=Vivek+Patel&background=7c3aed&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Great work! Will definitely try it out in my next project.",
    name: "Mohamed Fariz",
    role: "Lead Frontend Developer @ PIT Solutions | Next.js",
    image: "https://ui-avatars.com/api/?name=Mohamed+Fariz&background=0369a1&color=fff&size=80",
    rating: 5,
  },
  {
    text: "👏 Absolutely love it!",
    name: "Satyam Singh",
    role: "Senior Software Developer | React.js, Next.js, TypeScript, Tailwind CSS",
    image: "https://ui-avatars.com/api/?name=Satyam+Singh&background=f59e0b&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Looks modern and stylish!",
    name: "Ruslan Zi",
    role: "Software Engineer 5+ YoE | Go, Python | AI, Web3 | ex-Yandex",
    image: "https://ui-avatars.com/api/?name=Ruslan+Zi&background=ec4899&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Really loved it — the cube effect is awesome! Congratulations and much success! 🚀",
    name: "Facundo Guardia",
    role: "Co-Founder & AI Engineer at Sazonia | Healthcare · SaaS · Gov-tech",
    image: "https://ui-avatars.com/api/?name=Facundo+Guardia&background=10b981&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Nice work bro!",
    name: "Abdullah Mukadam",
    role: "Software Developer | Frontend Engineer | Shopify App Developer",
    image: "https://ui-avatars.com/api/?name=Abdullah+Mukadam&background=ef4444&color=fff&size=80",
    rating: 5,
  },
  {
    text: "That's cool!",
    name: "Anu Sree",
    role: "Web Developer | Exploring Systems",
    image: "https://ui-avatars.com/api/?name=Anu+Sree&background=8b5cf6&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Very good work!",
    name: "Elham Noori",
    role: "Aspiring Full Stack Developer | Frontend & Backend",
    image: "https://ui-avatars.com/api/?name=Elham+Noori&background=06b6d4&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Cool work bro! 👏",
    name: "Deep Rewale",
    role: "Frontend Web Developer | HTML, CSS, JavaScript, React.js",
    image: "https://ui-avatars.com/api/?name=Deep+Rewale&background=f97316&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Looks really nice!",
    name: "Zain Asif",
    role: "Software Engineer at Blacksight | Elixir, Phoenix, Angular & React",
    image: "https://ui-avatars.com/api/?name=Zain+Asif&background=14b8a6&color=fff&size=80",
    rating: 5,
  },
  {
    text: "This is amazing!!",
    name: "Basim Shahzad",
    role: "Junior Developer",
    image: "https://ui-avatars.com/api/?name=Basim+Shahzad&background=6366f1&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Great work!",
    name: "Naveed Abbasi",
    role: "Full-Stack Developer | MERN Stack | Building Scalable Web Systems",
    image: "https://ui-avatars.com/api/?name=Naveed+Abbasi&background=84cc16&color=fff&size=80",
    rating: 5,
  },
  {
    text: "This is great!",
    name: "Samuel Owolabi",
    role: "JavaScript Full Stack Developer | Web3 Specialist | Certified Project Manager",
    image: "https://ui-avatars.com/api/?name=Samuel+Owolabi&background=db2777&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Amazing work, man! 👏",
    name: "Faizan Naveed",
    role: "Helping startups build scalable web apps | React, Next.js, Node",
    image: "https://ui-avatars.com/api/?name=Faizan+Naveed&background=7c3aed&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Nice work, very cool project! Really glad I checked this out. 😊",
    name: "Jozef Kudrna",
    role: "Frontend Developer | Animations | CSS Art | Three.js | GSAP",
    image: "https://ui-avatars.com/api/?name=Jozef+Kudrna&background=0ea5e9&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Great work! ✨",
    name: "Roshaan Asif",
    role: "Aspiring MERN Stack Developer | JavaScript & Modern Web Technologies",
    image: "https://ui-avatars.com/api/?name=Roshaan+Asif&background=f59e0b&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Mind blowing! 👏",
    name: "Saloni Goyal",
    role: "Software Developer | Java | MERN | RiseUp with ServiceNow Alumni",
    image: "https://ui-avatars.com/api/?name=Saloni+Goyal&background=ec4899&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Really amazing, thanks for sharing! 👏",
    name: "Toomaj Bandad",
    role: "Frontend Developer | React, Next.js | MERN Stack",
    image: "https://ui-avatars.com/api/?name=Toomaj+Bandad&background=10b981&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Looks amazing!",
    name: "Abu Bakar",
    role: "Full Stack MERN Developer | Agentic AI Engineer",
    image: "https://ui-avatars.com/api/?name=Abu+Bakar&background=ef4444&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Looks amazing!",
    name: "Vlad Kniazev",
    role: "Senior Frontend Engineer | 6+ years | React, TypeScript, Node.js",
    image: "https://ui-avatars.com/api/?name=Vlad+Kniazev&background=8b5cf6&color=fff&size=80",
    rating: 5,
  },
  {
    text: "This is epic! 👏",
    name: "Ishaan Rai",
    role: "Software Engineer | Full-Stack & AI Developer | SaaS Products",
    image: "https://ui-avatars.com/api/?name=Ishaan+Rai&background=06b6d4&color=fff&size=80",
    rating: 5,
  },
  {
    text: "That's amazing! 😍",
    name: "Shaikh Jahangir Alam",
    role: "MERN Stack Developer | React.js | Next.js | GSAP | Three.js",
    image: "https://ui-avatars.com/api/?name=Shaikh+Jahangir&background=f97316&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Great work!",
    name: "Komil Hassan",
    role: "PHP / Laravel Developer | MERN Stack | Scalable Web Applications",
    image: "https://ui-avatars.com/api/?name=Komil+Hassan&background=14b8a6&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Impressive work! 👏",
    name: "Anuj Istwal",
    role: "UI/UX Designer | Founder @Studio AJ",
    image: "https://ui-avatars.com/api/?name=Anuj+Istwal&background=6366f1&color=fff&size=80",
    rating: 5,
  },
  {
    text: "Nice work!",
    name: "Jawahar Ambedkar",
    role: "Full-Stack Web Developer | React.js / Next.js | TypeScript | Prisma",
    image: "https://ui-avatars.com/api/?name=Jawahar+Ambedkar&background=84cc16&color=fff&size=80",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="relative py-32 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 border-dashed overflow-hidden">
      {/* Subtle Background Grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:96px_96px]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center gap-20">
          {/* Header */}
          <div className="flex flex-col items-center justify-center gap-6 text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-200 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm dark:border-zinc-800 cursor-pointer group transition-all"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Real Feedback Loop
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8]"
            >
              Loved by <br />
              <span className="text-zinc-300 dark:text-zinc-800 italic">
                Builders.
              </span>
            </motion.h3>

            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl font-medium">
              Join thousands of developers building high-performance interfaces
              with ZenBlocks primitives.
            </p>
          </div>

          {/* Testimonials */}
          <Testimonials className="px-0" testimonials={myTestimonials}/>
        </div>
      </div>
    </section>
  );
};
