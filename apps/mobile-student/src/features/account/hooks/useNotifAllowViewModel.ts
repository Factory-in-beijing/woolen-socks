import { useDisclosure } from "@/hooks/useDisclosure";

/** "Allow notifications" prompt. */
export function useNotifAllowViewModel() {
  const prompt = useDisclosure();
  return { asking: prompt.open, ask: prompt.show };
}
