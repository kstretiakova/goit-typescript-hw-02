import React from 'react';
import styles from './ImageCard.module.css';
import { Image } from '../../api/gallery'; 

interface ImageInfo {
  src: string;
  descr: string | null;
  likes: number;
  author: string;
}

interface ImageCardProps {
  image: Image; 
  onImageClick: (imageInfo: ImageInfo) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  const handleClick = () => {
    const imageInfo: ImageInfo = {
      src: image.urls.regular,
      descr: image.alt_description,
      likes: image.likes,
      author: image.user.name,
    };

    onImageClick(imageInfo);
  };

  return (
    <div className={styles.image_card}>
      <img
        onClick={handleClick}
        className={styles.img}
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
      />
    </div>
  );
};

export default ImageCard;
