import { useState } from 'react';

export const useToggle = (open = false) => {
  const [isOpen, setIsOpen] = useState(open);

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen((prev) => !prev),
  };
};
