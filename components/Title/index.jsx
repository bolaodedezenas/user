"use client";
export default function Title({ text }) {
  return (
    <h3 className="text-[rgb(var(--text-title))] text-[1.5rem] font-bold">{text}</h3>
  );
}