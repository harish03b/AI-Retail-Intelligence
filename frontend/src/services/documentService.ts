import api from "../api/axios";
import type { Document } from "../types/document";

export const documentService = {
  async getDocuments(): Promise<Document[]> {
    const response = await api.get<Document[]>("/documents");
    return response.data;
  },
};