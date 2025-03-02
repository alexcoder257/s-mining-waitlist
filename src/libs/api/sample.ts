import * as Type from "@/types";
const SAMPLE_API_BASE_URL = process.env.NEXT_PUBLIC_SAMPLE_BASE_URL;

const getHeaders = (
  requireToken: boolean,
  tokenValue?: Type.SampleToken,
  isFile?: boolean
): Headers => {
  const headers = new Headers();

  if (!isFile) {
    headers.append("Content-Type", "application/json");
  }

  if (requireToken) {
    const token = tokenValue?.token || "";
    headers.append("ACCESS-TOKEN", token);
  }
  return headers;
};

const getQueryParams = (queryParams: Type.SampleQuery): string => {
  const query = Object.entries(queryParams || {})
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `?${query}`;
};

const fetchSample = {
  get: async <T>(
    path: string,
    queryParams?: Type.SampleQuery,
    needToken?: boolean,
    tokenValue?: Type.SampleToken,
    cacheType?: RequestCache
  ): Promise<T> => {
    try {
      const headers = getHeaders(needToken || false, tokenValue);
      const url = new URL(`${SAMPLE_API_BASE_URL}${path}`);
      const query = queryParams ? getQueryParams(queryParams) : "";

      const res = await fetch(`${url}${query}`, {
        method: "GET",
        headers,
        credentials: "include",
        cache: cacheType || "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = (await res.json()) as T;
      return response;
    } catch (error) {
      throw error;
    }
  },
  post: async <T>(
    path: string,
    queryParams?: Type.SampleQuery,
    tokenValue?: Type.SampleToken,
    cacheType?: RequestCache
  ): Promise<T> => {
    try {
      const headers = getHeaders(true, tokenValue);
      const url = new URL(`${SAMPLE_API_BASE_URL}${path}`);
      const query = queryParams ? getQueryParams(queryParams) : "";

      const res = await fetch(`${url}${query}`, {
        method: "POST",
        headers,
        credentials: "include",
        cache: cacheType || "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = (await res.json()) as T;
      return response;
    } catch (error) {
      throw error;
    }
  },
  fileUpload: async (
    path: string,
    file: File,
    tokenValue?: Type.SampleToken
  ) => {
    try {
      const headers = getHeaders(true, tokenValue, true);
      const url = new URL(`${SAMPLE_API_BASE_URL}${path}`);

      const formData = new FormData();
      formData.append(
        "file",
        new File([file], file.name, { type: "image/jpg" })
      );

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default fetchSample;
