
export default function StatusBadge  ({ status }) {
  const isPaid = status === "Pago";
  return (
    <div className="flex items-center gap-2 font-medium">
      <span
        className={`w-2.5 h-2.5 rounded-full ${isPaid ? "bg-green-500" : "bg-orange-500"}`}
      />
      <span className={isPaid ? "text-green-700" : "text-orange-700"}>
        {status}
      </span>
    </div>
  );
};

 