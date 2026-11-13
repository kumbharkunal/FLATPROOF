"use client";

// ScrollTrigger, registered once. Loaded through loadST() so it stays out of first-load JS.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Keeps triggers steady when the phone address bar shows or hides.
ScrollTrigger.config({ ignoreMobileResize: true });

export { ScrollTrigger };
