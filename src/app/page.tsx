import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Gallery from "@/components/sections/gallery";
import Testimonial from "@/components/sections/testimonial";
import Booking from "@/components/sections/booking";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import BookingChat from "@/components/ui/booking-chat";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonial />
      <Booking />
      <Contact />
      <Footer />
      <BookingChat />
    </>
  );
}
