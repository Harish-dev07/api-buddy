export interface ApiEndpoint {
  id: string;
  name: string;
  keywords: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  description: string;
  requestBody: string;
  responseBody: string;
}

const STORAGE_KEY = "api-knowledge-hub-data";

const sampleData: ApiEndpoint[] = [
  {
    id: "1",
    name: "User Add API",
    keywords: "user add create register",
    method: "POST",
    url: "/api/v1/users",
    description: "Creates a new user in the system",
    requestBody: JSON.stringify({ name: "string", email: "string", role: "string" }, null, 2),
    responseBody: JSON.stringify({ id: "number", name: "string", email: "string", createdAt: "ISO8601" }, null, 2),
  },
  {
    id: "2",
    name: "Get All Users",
    keywords: "user list get all fetch",
    method: "GET",
    url: "/api/v1/users",
    description: "Retrieves a paginated list of all users",
    requestBody: "",
    responseBody: JSON.stringify({ data: [{ id: 1, name: "string", email: "string" }], total: "number", page: "number" }, null, 2),
  },
  {
    id: "3",
    name: "Delete User",
    keywords: "user delete remove",
    method: "DELETE",
    url: "/api/v1/users/:id",
    description: "Deletes a user by their ID",
    requestBody: "",
    responseBody: JSON.stringify({ success: true, message: "User deleted" }, null, 2),
  },
];

export function loadEndpoints(): ApiEndpoint[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  // Initialize with sample data
  saveEndpoints(sampleData);
  return sampleData;
}

export function saveEndpoints(endpoints: ApiEndpoint[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(endpoints));
}

export function searchEndpoints(query: string, endpoints: ApiEndpoint[]): ApiEndpoint[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  return endpoints.filter((ep) => {
    const searchable = `${ep.name} ${ep.keywords} ${ep.method} ${ep.url} ${ep.description}`.toLowerCase();
    return tokens.every((t) => searchable.includes(t));
  });
}
