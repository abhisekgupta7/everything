"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { plans } from "@/lib/constants";
import { features } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSection />
      <AboutProject />
      <FeatureSection />
      <PricingSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-medium text-sm shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Full-Stack Developer
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Everything You Want to Know
              <br />
              <span className="text-amber-600">About Me!</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-slate-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Discover my expertise in modern web development, AI integration,
              and premium software solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4 lg:justify-start justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link
                  href="https://abhisek-7.vercel.app/"
                  className="flex items-center gap-2"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-900">8+</div>
                <div className="text-sm text-slate-500">Technologies</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-900">100%</div>
                <div className="text-sm text-slate-500">Modern Stack</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-900">∞</div>
                <div className="text-sm text-slate-500">Possibilities</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <Image
                src="/office.jpg"
                width={400}
                height={400}
                alt="Professional workspace"
                className="rounded-xl shadow-2xl object-cover"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-lg shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Star className="w-4 h-4" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 bg-blue-500 text-white p-2 rounded-lg shadow-lg"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutProject() {
  return (
    <section className="py-20 px-6 bg-linear-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-900">
                About This Project
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                A comprehensive showcase of modern web development expertise,
                built with industry-leading technologies
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                This project demonstrates my complete skill set in practice, not
                just theoretical knowledge. Every component, every integration,
                every line of code represents real-world application of modern
                development principles.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Premium Quality
                </h4>
                <p className="text-sm text-slate-600">
                  Enterprise-grade code quality
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Modern Stack
                </h4>
                <p className="text-sm text-slate-600">
                  Latest technologies & practices
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      Full-Stack Excellence
                    </h4>
                    <p className="text-slate-600">
                      End-to-end development mastery
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-slate-700">
                      Next.js 15 with App Router
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">
                      TypeScript & Tailwind CSS
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-700">
                      AI Integration & Payments
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-700">Modern Deployment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Core Expertise
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The technologies and skills that power modern, scalable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full text-center group-hover:border-amber-200 border border-slate-200">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-slate-600 group-hover:text-amber-600 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {feature.name === "Authentication" &&
                    "Secure user management"}
                  {feature.name === "Dashboards" &&
                    "Interactive data visualization"}
                  {feature.name === "Charts and Graphs" &&
                    "Beautiful data representation"}
                  {feature.name === "Ai Integration" &&
                    "OpenAI & Gemini API integration"}
                  {feature.name === "Database" && "PostgreSQL with modern ORMs"}
                  {feature.name === "File Uploads" && "Seamless file handling"}
                  {feature.name === "Payment integration" &&
                    "Stripe payment processing"}
                  {feature.name === "Vercel deployment" &&
                    "Production-ready deployment"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planName: string) => {
    setLoading(priceId);

    // Validate price ID is configured
    if (
      !priceId ||
      priceId.startsWith("price_xxx") ||
      priceId.startsWith("prod_")
    ) {
      toast.error("Please configure valid Stripe price IDs in constants.ts");
      setLoading(null);
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, planName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to start checkout. Please try again.",
      );
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-20 px-6 bg-white ">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Premium Plans
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan to unlock the full potential of AI-powered
            PDF summarization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => {
            const isPro = plan.id === "pro";
            const isLoading = loading === plan.priceId;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative ${isPro ? "md:scale-105" : ""}`}
              >
                {/* Popular badge */}
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-amber-500 text-white font-semibold px-4 py-1 rounded-full text-sm">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
                    isPro
                      ? "border-2 border-amber-200"
                      : "border border-slate-200"
                  }`}
                >
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-end justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-slate-900">
                        ${plan.price}
                      </span>
                      <span className="text-slate-500 pb-1">/month</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSubscribe(plan.priceId, plan.name)}
                    disabled={isLoading}
                    className={`w-full py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isPro
                        ? "bg-amber-500 hover:bg-amber-600"
                        : "bg-slate-900 hover:bg-slate-800"
                    }`}
                  >
                    {isLoading ? "Loading..." : `Choose ${plan.name}`}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
