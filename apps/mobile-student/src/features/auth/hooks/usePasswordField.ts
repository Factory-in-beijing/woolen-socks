import { useState } from "react";

export type PasswordFieldState = {
  value: string;
  setValue: (value: string) => void;
  /** True while the characters are visible. */
  revealed: boolean;
  toggleReveal: () => void;
  focused: boolean;
  setFocused: (focused: boolean) => void;
};

/** Local state of one password input: its text, the show/hide toggle and the focus ring. */
export function usePasswordField(initial = ""): PasswordFieldState {
  const [value, setValue] = useState(initial);
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);
  return {
    value,
    setValue,
    revealed,
    toggleReveal: () => setRevealed((r) => !r),
    focused,
    setFocused,
  };
}
