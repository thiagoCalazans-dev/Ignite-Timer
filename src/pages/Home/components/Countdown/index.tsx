import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CycleContext } from "../../../../context/CyclesContext";
import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CycleContext);

  const totalSecond = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSecond - amountSecondsPassed : 0;

  const minutesAmounted = Math.floor(currentSeconds / 60);
  const secondsAmounted = currentSeconds % 60;

  const minutes = String(minutesAmounted).padStart(2, "0");
  const seconds = String(secondsAmounted).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );
        if (secondsDifference >= totalSecond) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSecond);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSecond, markCurrentCycleAsFinished, activeCycleId]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
function CyclesContext(CyclesContext: any): {
  activeCycle: any;
  activeCycleId: any;
  amountSecondsPassed: any;
  markCurrentCycleAsFinished: any;
  setSecondsPassed: any;
} {
  throw new Error("Function not implemented.");
}
