import axiosInstance from "@/services/common/axios-instance";
import { AxiosResponse } from "axios";

export class BaseService {
  protected post<T, B>(uri: string, body: B): Promise<AxiosResponse<T>> {
    return axiosInstance.post<T>(uri, body);
  }

  protected put<T, B>(uri: string, body: B): Promise<AxiosResponse<T>> {
    return axiosInstance.put<T>(uri, body);
  }

  protected get<T>(uri: string): Promise<AxiosResponse<T>> {
    return axiosInstance.get<T>(uri);
  }

  protected delete<T>(uri: string): Promise<AxiosResponse<T>> {
    return axiosInstance.delete<T>(uri);
  }
}
