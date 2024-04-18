import axios from 'axios';

const API_URL = 'https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json';

const getColorData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.colors;
  } catch (error) {
    throw new Error('Failed to fetch color data');
  }
};

export { getColorData };
