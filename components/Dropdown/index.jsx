'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveRecentItem } from '@/utils/saveRecentItem';


export default function Dropdown({ title, items, setRecentItems}) {
  const [open, setOpen] = useState(false);

  const limit = 4; // até 4 itens a altura cresce
  const itemHeight = 40; // px aproximados por item

  const dynamicHeight =
    items.length <= limit ? 'auto' : `${limit * itemHeight}px`;

  return (
    <div
      key={title}
      className='relative inline-block text-left h-full '
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className=' h-15 text-[1rem] font-medium hover:text-gray-300 cursor-pointer'>
        {title}
      </button>

      <div
        className={`
          absolute z-50 left-0 mt-0 min-w-max bg-white rounded-md shadow-lg 
          text-[0.9rem] text-[rgb(var(--text-title))] 
          border-0 overflow-y-auto transition-all duration-200 
          ${
            open
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }
        `}
        style={{
          height: open ? dynamicHeight : 0,
        }}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => {
              saveRecentItem({ label: item.label, href: item.href }),
              setRecentItems(false);
            }}
            className='block px-4 py-2 hover:bg-[rgb(var(--blue-50))]'
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
