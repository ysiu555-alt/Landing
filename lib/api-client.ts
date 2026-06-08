const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Helper to get cookie in api-client
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return '';
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

export async function apiClient<T = any>(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' 
    ? (localStorage.getItem('kaliang_jwt_token') || getCookie('kaliang_jwt_token')) 
    : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  } as Record<string, string>;

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    return {
      ok: response.ok,
      status: response.status,
      data: data as T,
    };
  } catch (error) {
    console.error(`API Fetch Error (${endpoint}):`, error);
    return {
      ok: false,
      status: 500,
      data: { message: "Network error" } as T,
    };
  }
}
