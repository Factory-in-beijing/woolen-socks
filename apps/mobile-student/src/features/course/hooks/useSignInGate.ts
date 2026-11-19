import { useDisclosure } from "@/hooks/useDisclosure";

/** The "create an account to start the free lesson" sheet shown on the signed-out course screens. */
export function useSignInGate() {
  const gate = useDisclosure();
  return { gate: gate.open, askSignIn: gate.show, closeGate: gate.hide };
}
