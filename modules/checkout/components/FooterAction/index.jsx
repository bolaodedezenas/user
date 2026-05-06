import { FiArrowRight } from "react-icons/fi";
import Button from "@/components/Btns/Button";
export function FooterAction({ label, onClick  }) {
  return (
    <div className="w-full flex justify-center items-center">
      <Button
        onClick={onClick}
        text={label}
        className="flex items-center justify-center gap-2"
        icon={<FiArrowRight />}
      />
    </div>
  );
}
