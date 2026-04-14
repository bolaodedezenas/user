// Função para formatar o telefone
export const formatPhoneNumber = (value) => {
  // Remove qualquer caractere não numérico
  const cleanedValue = value.replace(/\D/g, "");
  // Se o valor estiver vazio, retorne uma string vazia
  if (cleanedValue.length === 0) {
    return "";
  }
  // Verifica a quantidade de números e aplica a formatação
  if (cleanedValue.length <= 2) {
    return `(${cleanedValue}`;
  } else if (cleanedValue.length <= 7) {
    return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2)}`;
  } else {
    return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
  }
}
