import { Fugaz_One } from "next/font/google";
import React from "react";
import Button from "./Button";
import Callendar from "./Callendar";
import Link from "next/link";
import CallToAction from "./CallToAction";


const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  return (
    <div className="py-4 md:py:12 flex flex-col gap-8 sm:gap-10">
      <h1
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">Mood Tracker</span> helps you track your{" "}
        <span className="textGradient">daily</span> mood!
      </h1>
      <p className="w-full mx-auto max-w-[600px] text-lg sm:text-xl md:text-2xl text-center">
        Create your mood record and see how you feel on every day of every year
      </p>
      <CallToAction/>
      <Callendar demo />
    </div>
  );
}
