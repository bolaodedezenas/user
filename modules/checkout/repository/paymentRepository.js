export async function createPixRepository(payload) {
  const response = await fetch("/api/mercadopago/create-pix", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  return response.json();
}
