import axiosInstance from "./axiosInstance";

export const fetchCharacters = async () => {
  const allCharacters: any[] = [];

  // Petición inicial
  const firstResponse = await axiosInstance.get("");
  allCharacters.push(...firstResponse.data.items);

  const totalPages = firstResponse.data.meta.totalPages;
  const requests = [];

  for (let i = 2; i <= totalPages; i++) {
    requests.push(axiosInstance.get(`?page=${i}`));
  }

  const responses = await Promise.all(requests);
  responses.forEach((res) => {
    allCharacters.push(...res.data.items);
  });

  const limitedCharacters = allCharacters.slice(0, 50);
  // Peticiones adicionales por personaje para obtener el detalle
  const detailedRequests = limitedCharacters.map((char) =>
    axiosInstance.get(`${char.id}`)
  );

  const detailedResponses = await Promise.all(detailedRequests);
  const detailedCharacters = detailedResponses.map((res) => res.data);

  return detailedCharacters;
};
