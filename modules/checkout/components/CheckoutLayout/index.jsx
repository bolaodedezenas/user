import React from "react";

export default function CheckoutLayout({ header, footer, children }) {
  return (
    <div className="flex flex-col bg-gray-50 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-zinc-300 ">
        {header}
      </div>

      {/* Conteúdo */}
      <main className="p-4 w-full">{children}</main>

      {/* Footer */}
      <div className="sticky bottom-0 z-10 bg-white border-t border-zinc-300 p-4">
        {footer}
      </div>
    </div>
  );
}
