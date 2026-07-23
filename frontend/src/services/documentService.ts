import api from "../api/axios";
import type { Document } from "../types/document";

export const documentService = {
  async getDocuments(): Promise<Document[]> {
    const { data } = await api.get<Document[]>("/documents");
    return data;
  },

  async uploadDocument(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    await api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async deleteDocument(filename: string): Promise<void> {
    await api.delete(`/documents/${encodeURIComponent(filename)}`);
  },
};