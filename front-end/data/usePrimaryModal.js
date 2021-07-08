import { useState } from "react";

export const usePrimaryModal = () => {
  const [openPrimary, setIsPrimaryOpen] = useState(false);

  const togglePrimary = () => setIsPrimaryOpen(!openPrimary);

  return {
    openPrimary,
    togglePrimary,
  };
};
