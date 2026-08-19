import { api } from "@/shared/api/axios";
import type { DebriefBody, DebriefDto, ResponseWithData } from "../model/";

export const getAllDebrief = async (): Promise<DebriefDto[]> => {
  const { data } = await api.get<ResponseWithData<DebriefDto[]>>(`/debrief`);

  return data.data;
};

export const getDebrief = async (id: string): Promise<DebriefDto> => {
  const { data } = await api.get<ResponseWithData<DebriefDto>>(
    `/debrief/${id}`,
  );

  return data.data;
};

export const patchDebrief = async (
  id: string,
  body: DebriefBody,
): Promise<DebriefBody> => {
  const { data } = await api.patch<DebriefDto>(`/debrief/${id}`, body);

  return data;
};
export const createDebrief = async (
  body: DebriefBody,
): Promise<DebriefBody> => {
  const { data } = await api.post<DebriefDto>(`/debrief`, body);

  return data;
};

export const deleteDebrief = async (id: string): Promise<DebriefDto> => {
  const { data } = await api.delete<ResponseWithData<DebriefDto>>(
    `/debrief/${id}`,
  );

  return data.data;
};
