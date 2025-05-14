import { serverApi } from "../../lib/config";

import axios from "axios";
import { Member } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      let url = `${this.path}/member/top-users`;
      const result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.log("error, getTopUsers", error);
      throw error;
    }
  }
}

export default MemberService;
