import { useDisclosure } from "@/hooks/useDisclosure";

/** "Allow notifications" prompt shown after a successful payment. */
export function useNotifAllowPayViewModel() {
  const prompt = useDisclosure();
  return { asking: prompt.open, ask: prompt.show };
}
