import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";
import { faqs } from "@/lib/faqs";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={faqSchema(faqs)} />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <WhyChoose />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
