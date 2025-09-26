const BASE_URL = "https://around-api.es.tripleten-services.com/v1/";

export async function loginUser(email, password) {
  return fetch(BASE_URL + "signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      console.error("Error al cargar el usuario:", error);
    });
}

export async function registerUser() {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      console.error("Error al registrar el usuario:", error);
    });
}
