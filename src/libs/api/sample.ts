const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getHeaders = (
  requireToken: boolean,
  tokenValue?: any,
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

const getQueryParams = (queryParams: any): string => {
  const query = Object.entries(queryParams || {})
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `?${query}`;
};

const fetchApi = {
  get: async <T>(
    path: string,
    queryParams?: any,
    needToken?: boolean,
    tokenValue?: any,
    cacheType?: RequestCache
  ): Promise<T> => {
    try {
      const headers = getHeaders(needToken || false, tokenValue);
      const url = new URL(`${BASE_URL}${path}`);
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
  post: async (
    path: string,
    payload?: any,
    needToken?: boolean,
    queryParams?: object,
    cacheType?: RequestCache
  ) => {
    try {
      const headers = getHeaders(needToken || false);
      const url = new URL(`${BASE_URL}${path}`);
      const query = queryParams ? getQueryParams(queryParams) : "";

      const option: any = {
        method: "POST",
        headers,
        cache: cacheType || "no-store",
      };
      if (payload) {
        option.body = JSON.stringify(payload);
      }
      const res = await fetch(`${url}${query}`, option);

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.message || "An error occurred";
        throw new Error(errorMessage);
      }

      const response = await res.json();
      return response;
    } catch (error) {
      throw error;
    }
  },
  fileUpload: async (path: string, file: File, tokenValue?: any) => {
    try {
      const headers = getHeaders(true, tokenValue, true);
      const url = new URL(`${BASE_URL}${path}`);

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

export default fetchApi;
