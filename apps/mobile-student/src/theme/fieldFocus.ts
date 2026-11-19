/** Focus look shared by the outlined inputs: blue 1.5px border + soft ring while focused, grey 1px border otherwise. */
export function fieldFocus(focused: boolean) {
  return {
    border: focused
      ? { borderWidth: 1.5, borderColor: "#0E1C91" }
      : { borderWidth: 1, borderColor: "#E2E6F6" },
    ring: focused ? "0 0 0 4px rgba(14,28,145,0.08)" : undefined,
    label: focused ? "#0E1C91" : "#8A93B8",
  };
}
