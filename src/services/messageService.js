import APIClient from "../core/utils/apiclient";
import { AxiosResponse, AxiosInstance } from "axios";

const apiclient = new APIClient().getInstance();

class MessageService {
  async getMessageList(params) {
    try {
      const res = await apiclient.get("/api/v3/messages", { params });
      return res.data?.data;
    } catch (err) {
      return [];
    }
  }

  async postMessage(params) {
    try {
      const res = await apiclient.post("/api/v3/messages", { params });
      return res.data?.data;
    } catch (err) {
      return [];
    }
  }
}

export const messageService = new MessageService();
