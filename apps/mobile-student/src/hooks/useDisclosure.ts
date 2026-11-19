import { useCallback, useState } from "react";

/** Open/closed state for sheets, dialogs and gates. */
export function useDisclosure(initiallyOpen = false) {
  const [open, setOpen] = useState(initiallyOpen);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);
  return { open, show, hide, toggle };
}
