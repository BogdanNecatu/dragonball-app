import axiosInstance from '../../../shared/api/axiosInstance';

export const fetchCharacters = async () => {
  try {
    const allCharacters: any[] = [];

    // Petición inicial
    const firstResponse = await axiosInstance.get('');
    const { items, meta } = firstResponse.data;

    allCharacters.push(...items);

    const totalPages = meta.totalPages;
    const requests = [];

    for (let i = 2; i <= totalPages; i++) {
      requests.push(axiosInstance.get(`?page=${i}`));
    }

    const responses = await Promise.allSettled(requests);

    responses.forEach((res) => {
      if (res.status === 'fulfilled') {
        allCharacters.push(...res.value.data.items);
      } else {
        console.warn('Failed to load page:', res.reason);
      }
    });

    const limitedCharacters = allCharacters.slice(0, 50);

    // Peticiones adicionales por personaje para obtener el detalle
    const detailedRequests = limitedCharacters.map((char) =>
      axiosInstance.get(`${char.id}`)
    );

    const detailedResponses = await Promise.allSettled(detailedRequests);

    const detailedCharacters = detailedResponses
      .filter((res) => res.status === 'fulfilled')
      .map((res: any) => res.value.data);

    return detailedCharacters;
  } catch (error) {
    console.error('Error fetching Dragon Ball characters:', error);
    throw new Error('Failed to fetch Dragon Ball characters. Please try again later.');
  }
};
