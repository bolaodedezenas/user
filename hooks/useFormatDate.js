
export function useFormatDateTime() {
  function formatDate(timestamp) {
    if (!timestamp) {
      return {
        date: "",
        time: "",
      };
    }

    const date = new Date(timestamp);

    return {
      date: date.toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      }),

      time: date.toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  return { formatDate };
}

