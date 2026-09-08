import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export const useProject = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.project);

  return {
    ...project,
    dispatch,
  };
};
