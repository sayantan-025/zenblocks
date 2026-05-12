// FAQ section data for Quill landing page
import type { FAQData } from "../types";

export const FAQ_DATA: FAQData = {
  badge: "FAQ",
  title: "Common questions.",
  subtitle: "Everything you need to know about Quill.",
  items: [
    {
      question: "How does Quill's AI writing work?",
      answer:
        "Quill uses advanced language models to understand your context, tone, and intent. Simply start typing or describe what you want to write, and Quill generates polished content that matches your style.",
      category: "How it works",
    },
    {
      question: "Can I use Quill for different types of content?",
      answer:
        "Absolutely! Quill is versatile and handles blogs, emails, ad copy, product descriptions, social media posts, and more. Each type has optimized prompts and templates.",
      category: "Features",
    },
    {
      question: "Does Quill support multiple languages?",
      answer:
        "Yes! Quill supports 50+ languages. You can write in your preferred language and even translate content while preserving nuance and tone.",
      category: "Features",
    },
    {
      question: "How accurate is the tone-matching feature?",
      answer:
        "Quill learns from samples you provide and creates a style profile that captures your unique voice, word choices, and phrasing patterns. The more examples you give, the more accurate it becomes.",
      category: "Features",
    },
    {
      question: "Is my content private and secure?",
      answer:
        "Yes. Your content is encrypted and we never use it to train our models. You retain full ownership of everything you create with Quill.",
      category: "Privacy",
    },
    {
      question: "Can I collaborate with my team on Quill?",
      answer:
        "The Team plan includes real-time collaboration, team management, and shared tone profiles. Perfect for content teams who need consistent brand voice across all writers.",
      category: "Teams",
    },
  ],
};
