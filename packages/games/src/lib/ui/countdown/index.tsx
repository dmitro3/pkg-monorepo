'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';

import styles from './style.module.css';

// Define a type for our context state
export type CountdownContextState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Context
const CountdownContext = React.createContext<CountdownContextState | null>(null);

// Define types for the props
interface CountdownProviderProps {
  targetDate: string;
  children: React.ReactNode;
  onTimeLeftChange?: (timeLeft: CountdownContextState) => void;
}

// Root Component
export const CountdownProvider = ({
  targetDate,
  children,
  onTimeLeftChange,
}: CountdownProviderProps) => {
  const [timeLeft, setTimeLeft] = useState<CountdownContextState>(calculateTimeLeft(targetDate));

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const timeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(timeLeft);
      onTimeLeftChange && onTimeLeftChange(timeLeft);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetDate]);

  return <CountdownContext.Provider value={timeLeft}>{children}</CountdownContext.Provider>;
};

// Helper function to calculate time left
function calculateTimeLeft(targetDate: string): CountdownContextState {
  const difference = +new Date(targetDate) - +new Date();

  let timeLeft: CountdownContextState = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

export const Days: React.FC = () => {
  const context = useContext(CountdownContext);

  const ref = useRef({} as HTMLSpanElement | null);

  useEffect(() => {
    ref?.current?.style.setProperty('--value', `${context?.days}`);
  }, [context?.days]);

  return (
    <span className={styles.countdown}>
      <span ref={ref}>{context?.days || 0}</span>
    </span>
  );
};

export const Hours: React.FC = () => {
  const context = useContext(CountdownContext);

  const ref = useRef({} as HTMLSpanElement | null);

  useEffect(() => {
    ref?.current?.style.setProperty('--value', `${context?.hours}`);
  }, [context?.hours]);

  return (
    <span className={styles.countdown}>
      <span ref={ref}>{context?.hours || 0}</span>
    </span>
  );
};

export const Minutes: React.FC = () => {
  const context = useContext(CountdownContext);

  const ref = useRef({} as HTMLSpanElement | null);

  useEffect(() => {
    ref?.current?.style.setProperty('--value', `${context?.minutes}`);
  }, [context?.minutes]);

  return (
    <span className={styles.countdown}>
      <span ref={ref}>{context?.minutes || 0}</span>
    </span>
  );
};

export const Seconds: React.FC = () => {
  const context = useContext(CountdownContext);

  const ref = useRef({} as HTMLSpanElement | null);

  useEffect(() => {
    ref?.current?.style.setProperty('--value', `${context?.seconds}`);
  }, [context?.seconds]);

  return (
    <span className={styles.countdown}>
      <span ref={ref}>{context?.seconds || 0}</span>
    </span>
  );
};
