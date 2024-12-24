import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchImagesBySearchValue, Image } from './api/gallery'; // Імпорт інтерфейсу Image
import { noMatches } from './messages/toastMessages';

import Section from './components/Section/Section';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

import './App.css';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

interface FetchImagesResponse {
  results: Image[]; 
  total_pages: number;
}

function App() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [fetchedImages, setFetchedImages] = useState<Image[] | null>(null); 
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedImage, setClickedImage] = useState<Image | null>(null); 

  const fetchImages = async (searchValue: string, page: number): Promise<void> => {
    try {
      setIsLoading(true);

      const data: FetchImagesResponse = await fetchImagesBySearchValue(searchValue, page);

      if (data.total_pages === 0) {
        noMatches(searchValue);
        return;
      }
      setTotalPages(data.total_pages);

      if (page > 1) {
        setFetchedImages(prevImages => (prevImages ? [...prevImages, ...data.results] : data.results));
      } else {
        setFetchedImages(data.results);
      }

      if (isError) setIsError(null);
    } catch (error: any) {
      setIsError(error.message);
      setFetchedImages(null);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (queryText: string): void => {
    setPage(1);
    setSearchValue(queryText);
  };

  const onLoadMoreClick = (): void => {
    setPage(prevPage => prevPage + 1);
  };

  const onImageClick = (imageInfo: { src: string; description: string | null; likesCount: number; author: string; }): void => {
    const image: Image = {
      id: '',
      urls: {
        small: imageInfo.src,
        regular: imageInfo.src,
      },
      alt_description: imageInfo.description,
      likes: imageInfo.likesCount,
      user: {
        name: imageInfo.author,
      },
    };
    setClickedImage(image);
    openModal();
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (searchValue === null) return;
    fetchImages(searchValue, page);
  }, [searchValue, page]);

  return (
    <>
      <SearchBar onSubmit={onSearch} />

      <Toaster />

      <Section>
        {isError && <ErrorMessage error={isError} />}
        {fetchedImages && <ImageGallery images={fetchedImages} onImageClick={onImageClick} />}
        {totalPages > 1 && totalPages !== page && <LoadMoreBtn onLoadMoreClick={onLoadMoreClick} />}
        <ImageModal
          isOpen={isModalOpen}
          onCloseModalClick={closeModal}
          imageInfo={
            clickedImage
              ? {
                  src: clickedImage.urls.regular,
                  descr: clickedImage.alt_description || '',
                  author: clickedImage.user.name,
                  likes: clickedImage.likes,
                }
              : null
          }
        />
        {isLoading && <Loader />}
      </Section>
    </>
  );
}

export default App;
