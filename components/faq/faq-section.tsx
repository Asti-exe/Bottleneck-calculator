'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqData = [
  {
    question: "What is a PC bottleneck?",
    answer: "A bottleneck is a situation where one component limits the overall performance of your system. Even if you have a top-tier GPU, a weaker CPU can prevent it from reaching its full potential, creating a \"bottleneck\" that caps performance."
  },
  {
    question: "Is a CPU or GPU bottleneck worse?",
    answer: "For gaming, a slight GPU bottleneck is often ideal, as it means your graphics card is the component working the hardest to produce maximum visual quality. A significant CPU bottleneck is generally worse for gaming because it can cause stuttering and inconsistent frame rates that can't be fixed by lowering graphics settings."
  },
  {
    question: "How accurate is this calculator?",
    answer: "This tool provides a highly accurate, data-driven estimate based on the relative power of components. It's an excellent guide for build planning. However, real-world performance can vary by game, application, and driver versions. We always suggest pairing this data with real-world benchmark reviews."
  },
  {
    question: "Do other components like RAM cause bottlenecks?",
    answer: "Yes. While the CPU/GPU relationship is the most critical, other parts matter. Insufficient or slow RAM can cause stuttering in demanding tasks. Likewise, a slow hard drive (HDD) will drastically increase loading times compared to an SSD, creating a noticeable storage bottleneck."
  }
];

export function FAQSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}