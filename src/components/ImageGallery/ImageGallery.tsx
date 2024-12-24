import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

interface ImageInfo {
  src: string;
  descr: string | null;
  likes: number;
  author: string;
}

interface GalleryImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
  likes: number;
  user: {
    name: string;
  };
}

interface ImageGalleryProps {
  images: GalleryImage[]; // Array of images, each conforming to the GalleryImage interface
  onImageClick: (imageInfo: {
    src: string;         // The source URL of the image
    description: string | null; // The description of the image, can be null
    likesCount: number;  // Number of likes the image has
    author: string;      // Author of the image
  }) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div>
      <ul className={styles.list}>
        {images.map(image => (
          <li className={styles.list_item} key={image.id}>
            <ImageCard
              image={image}
              onImageClick={() =>
                onImageClick({
                  src: image.urls.regular,
                  description: image.alt_description ?? 'No description',
                  likesCount: image.likes,
                  author: image.user.name,
                })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;