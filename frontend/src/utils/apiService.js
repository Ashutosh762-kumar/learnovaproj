const API_BASE_URL = "https://learnovaproj.onrender.com";

export default API_BASE_URL;

export const getRequest = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
};

export const postRequest = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
};
