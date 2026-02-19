import Button from "../common/button";
import { useState } from "react";

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
  text: string;
}

export default function ModalConfirmation({
  onCancel,
  onConfirm,
  text,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm() {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  }

  return (
    <>
      <p className="mt-5 mb-8 t-start text-tertiary font-semibold"> {text}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button className="outlined" isLoading={isLoading} onClick={handleConfirm}> Yes </Button>
        <Button className="contained" onClick={onCancel} disabled={isLoading}>No</Button>
      </div>
    </>
  );
}
