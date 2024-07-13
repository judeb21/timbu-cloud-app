import axiosInstance from "../services/axios";

export const timbuGetData = async (url: string) => {
  const { data } = await axiosInstance({
    method: "get",
    url,
  });
  return data;
};
