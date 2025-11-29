"use client";

export default function Label({ children, id }) {
    return (
        <label htmlFor={id} className="
            w-full
            block 
            text-[0.9rem] 
            font-medium 
            text-[rgb(var(--text))] 
            position: absolute
            top-1
            cursor-pointer
            pl-4
            ">
            {children}
        </label>
    );
}
