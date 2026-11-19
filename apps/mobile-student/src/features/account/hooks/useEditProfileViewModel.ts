import { useDisclosure } from "@/hooks/useDisclosure";

/** Edit profile: the "delete account" confirmation sheet. */
export function useEditProfileViewModel() {
  const confirmDelete = useDisclosure();
  return {
    delShow: confirmDelete.open ? ("flex" as const) : ("none" as const),
    openDel: confirmDelete.show,
    closeDel: confirmDelete.hide,
  };
}
