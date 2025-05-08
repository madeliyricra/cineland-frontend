export const convertDate = (date: string) => {
  const formatDate = new Date(date);
  const convert = formatDate.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return convert;
};
