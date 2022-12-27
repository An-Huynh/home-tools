import { User } from "@/models/user";
import { BaseService } from "@/services/common/base-service";
import { AxiosResponse } from "axios";

class UserService extends BaseService {
  public getUser(userId: string): Promise<AxiosResponse<User>> {
    return this.get(`/user/${userId}`);
  }
}

export default new UserService();
