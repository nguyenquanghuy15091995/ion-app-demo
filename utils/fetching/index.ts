const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

const get = async <T>({ url, options }: { url: string; options?: RequestInit }): Promise<T> => {
  return (await fetch(`${apiUrl}${url}`, options)).json();
}

const post = async <T, B>({ url, options, body }: { url: string; options?: RequestInit, body?: B }): Promise<T> => {
  return (await fetch(
    `${apiUrl}${url}`,
    {
      ...options,
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    }
  )).json();
}

export const fetching = {
  get,
  post,
}
