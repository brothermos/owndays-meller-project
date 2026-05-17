import axios from "axios";
import { API_BASE_URL } from "@/app/config/env";

export const API_TIMEOUT_MS = 15_000;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});
