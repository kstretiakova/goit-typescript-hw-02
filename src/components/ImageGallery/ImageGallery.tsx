import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';
import { Image } from '../../api/gallery'; 

interface ImageGalleryProps {
  images: Image[]; 
  onImageClick: (imageInfo: {
    src: string;
    description: string | null;
    likesCount: number;
    author: string;
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
