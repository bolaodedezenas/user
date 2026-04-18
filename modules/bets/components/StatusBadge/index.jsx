
export default function StatusBadge  ({ status }) {
  const isPaid = status === "Pago";
  return (
    <div className="flex items-center gap-2 font-medium">
      <span
        className={`w-3 h-3 animate-pulse rounded-full ${isPaid ? "bg-green-500" : "bg-orange-600"}`}
      />
      <span className={isPaid ? "text-zinc-800" : "text-zinc-800"}>
        {status}
      </span>
    </div>
  );
};

 