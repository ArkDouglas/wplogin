// lib/fetchAPI.js

export async function fetchAPI(query, { variables } = {}, currentUser = {}) {
  const headers = { "Content-Type": "application/json" };

  if (currentUser?.authToken) {
    headers["Authorization"] = `Bearer ${currentUser.authToken}`;
  }

  variables = variables.input;
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}
