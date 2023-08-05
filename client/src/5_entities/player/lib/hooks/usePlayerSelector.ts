import { useTypedSelector } from "@shared/hooks";

export const usePlayerSelector = () => useTypedSelector((state) => state.player);
