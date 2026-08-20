import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createDebrief,
  deleteDebrief,
  getAllDebrief,
  getDebrief,
  patchDebrief,
} from "./debrief.api";
import { DebriefBody } from "../model";

export const debriefQuery = (id: string) =>
  queryOptions({
    queryKey: ["debrief", id],
    queryFn: () => getDebrief(id),
  });

export const allDebriefQuery = () =>
  queryOptions({
    queryKey: ["debriefs"],
    queryFn: () => getAllDebrief(),
  });

export const useCreateDebriefMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDebrief,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["debriefs"],
      });
    },
  });
};

export const useDeleteDebriefMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDebrief(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["debriefs"],
      });
    },
  });
};

export const useUpdateDebriefMutation = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DebriefBody }) =>
      patchDebrief(id, body),

    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["debriefs"],
    //   });
    // },
  });
};
