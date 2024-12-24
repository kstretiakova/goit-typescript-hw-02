import axios from 'axios';


export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
  likes: number;
  user: {
    name: string;
    profile_image?: {
      small: string;
    };
  };
}

interface FetchImagesResponse {
  total_pages: number;
  results: Image[];
}

const galleryInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
  params: {
    client_id: 'acVujeomuaS1q3_vwesJkm8Mq5vVW_MEzbexo3KLiyo',
    orientation: 'portrait',
  },
});


export const fetchImagesBySearchValue = async (
  searchValue: string,
  page: number
): Promise<FetchImagesResponse> => {
  try {
    const { data } = await galleryInstance.get<FetchImagesResponse>(
      `/search/photos`,
      {
        params: { query: searchValue, page },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
