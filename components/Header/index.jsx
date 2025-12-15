"use client";

import { BoxHeader } from "./styles";
//store
import { useToggleStore } from "@/stores/toggleStore";

export default function Header({ children, className }) {
  const { toggle } = useToggleStore();

  return (
    <BoxHeader
      toggle={toggle}
      className={`{
      bg-white  flex flex-wrap  gap-4 items-center   p-3  rounded-[10px] shadow-lg select-none
      absolute top-3 right-0 trasition-all duration-300 z-40
       ${className}
    `}
    >
      {children}
    </BoxHeader>
  );
}

