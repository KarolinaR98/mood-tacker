"use client";

import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Callendar from "./Callendar";
import { useAuth } from "@/app/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "./Login";
import Loading from "./Loading";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});

  function countValues() {}

  async function handleSetMood(mood) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };

      if (!newData?.[year]) {
        newData[year] = {};
      }

      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;

      setData(newData);
      setUserDataObj(newData);

      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Failed to set data: ", err.message);
    }
  }

  const statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    "&*@#$": "🤬",
    Sad: "🙁",
    Neutral: "😶",
    Good: "😃",
    Delighted: "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }

    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-10 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg gap-4">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div className="p-4 flex flex-col gap-1 sm:gap-2" key={statusIndex}>
              <p className="font-medium uppercase text-xs sm:text-sm truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className={"text-base sm:text-lg truncate " + fugaz.className}>
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handleSetMood(currentMoodValue);
              }}
              className={
                "text-center p-4 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-200 flex flex-col items-center " +
                (moodIndex === 4 ? " col-span-2 sm:col-span-1" : " ")
              }
              key={moodIndex}
            >
              <p className="pb-2 text-5xl sm:text-6xl md:text-7xl">
                {moods[mood]}
              </p>
              <p
                className={
                  "text-indigo-500 text-md sm:text-lg " + fugaz.className
                }
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Callendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
