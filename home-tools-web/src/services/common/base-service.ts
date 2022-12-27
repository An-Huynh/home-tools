import axiosInstance from "@/services/common/axios-instance";
import { AxiosResponse } from "axios";

export class BaseService {
  public post<T>(uri: string, body: any): Promise<AxiosResponse<T>> {
    return axiosInstance.post<T>(uri, body);
  }

  public put<T>(uri: string, body: any): Promise<AxiosResponse<T>> {
    return axiosInstance.put<T>(uri, body);
  }

  public get<T>(uri: string): Promise<AxiosResponse<T>> {
    return axiosInstance.get<T>(uri);
  }

  public delete<T>(uri: string): Promise<AxiosResponse<T>> {
    return axiosInstance.delete<T>(uri);
  }
}
