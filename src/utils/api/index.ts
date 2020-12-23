import app from "firebase";

export const makeRequest = async (path: string, headers?: Headers) => {
  const host = process.env.REACT_APP_SERVER_HOST || "";
  const response = await (
    await fetch(`${host}${path}`, {
      headers,
      mode: "cors",
    })
  ).json();

  return response.data;
};

export const makeAuthenticatedRequest = async (
  user: app.User,
  path: string
) => {
  const authToken = await user.getIdToken();
  const headers = new Headers({
    Authorization: `Bearer ${authToken}` || "",
  });

  return makeRequest(path, headers);
};
