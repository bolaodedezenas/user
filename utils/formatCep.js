
export const formatCep = (value) => {
  // Remove qualquer caractere não numérico
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length === 0) return "";

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 5) {
    return cleaned.slice(0, 2) + "." + cleaned.slice(2);
  } else {
    return (
      cleaned.slice(0, 2) +
      "." +
      cleaned.slice(2, 5) +
      "-" +
      cleaned.slice(5, 8)
    );
  }
}

