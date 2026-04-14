
export const buscarCEP = async (valor) => {
  try {
    const somenteNumeros = valor.replace(/\D/g, "");

    if (somenteNumeros.length !== 8) {
      return { error: "CEP inválido" };
    }

    const res = await fetch(`https://viacep.com.br/ws/${somenteNumeros}/json/`);

    const data = await res.json();

    if (data.erro) {
      return { error: "CEP não encontrado" };
    }

    return { data };
  } catch (err) {
    return { error: "Erro ao buscar CEP" };
  }
};
