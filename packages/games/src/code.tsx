"use client";

export function Code({
  name,
}: {
  name: string;
}): JSX.Element {

  return (
    <span>
      Hi {name}! Hello from WINR!
    </span>
  );
}
