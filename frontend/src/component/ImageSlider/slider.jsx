import React, { useState } from 'react';
import styles from './style.module.css';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className={styles.imageSlider}>
            <div className={styles.slides}>
                {images.length > 0 && <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />}
            </div>
            <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
                &#9664;
            </button>
            <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
                &#9654;
            </button>
        </div>
    );
};

export default ImageSlider;
