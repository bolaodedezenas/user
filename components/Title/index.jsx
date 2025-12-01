"use client";
export default function Title({ text, className }) {
  return (
    <h3 className={`text-[rgb(var(--text-title))] text-[1.3rem] font-bold ${className}`}>
      {text}
    </h3>
  );
}