import { AxiosResponse } from "axios";

import { Home, PaginatedHomeResponse } from "@/models/home";
import { BaseService } from "@/services/common/base-service";

class HomeService extends BaseService {
  public getHomes(
    ownerId: string,
    page: number,
    pageSize: number
  ): Promise<AxiosResponse<PaginatedHomeResponse>> {
    return this.get(
      `/home?ownerId=${ownerId}&page=${page}&pageSize=${pageSize}`
    );
  }

  public deleteHome(id: string) {
    return this.delete(`/home/${id}`);
  }

  public createHome(home: Home): Promise<AxiosResponse<Home>> {
    return this.post("/home", home);
  }

  public updateHome(home: Home): Promise<AxiosResponse<Home>> {
    return this.put(`/home/${home.id}`, home);
  }
}

export default new HomeService();
