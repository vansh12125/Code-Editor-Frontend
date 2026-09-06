import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return {
    ...auth,
    dispatch,
  };
};
