import React, { useState } from 'react';
import ImageSlider from '../../component/ImageSlider/slider';
import styles from './style.module.css'; // Import CSS module

export default function Search() {
    // Combined state object for form fields
    const [formData, setFormData] = useState({
        searchTerm: '',
        selectedType: '', // Single value for selected type
        offer: false,
        furnished: false,
        parking: false,
        sortOption: 'desc'
    });

    // Sample results
    const sampleResults = [
        {
            id: 1,
            images: [
                'https://cms.interiorcompany.com/wp-content/uploads/2023/11/simple-home-design-Warm-grey-exteriors.png',
                'https://images.pexels.com/photos/1643381/pexels-photo-1643381.jpeg'
            ],
            name: 'Luxury Apartment in Downtown',
            price: '$1,200,000',
            location: 'Downtown City Center',
            type: 'rentAndSale'
        },
        {
            id: 2,
            images: [
                'https://images.pexels.com/photos/1643381/pexels-photo-1643381.jpeg'
            ],
            name: 'Cozy Cottage in the Suburbs',
            price: '$350,000',
            location: 'Sunny Suburbs',
            type: 'sale'
        },
        {
            id: 3,
            images: [
                'https://images.pexels.com/photos/1643381/pexels-photo-1643381.jpeg'
            ],
            name: 'Modern Loft with City View',
            price: '$950,000',
            location: 'City View District',
            type: 'rent'
        },
        {
            id: 4,
            images: [
                'https://images.pexels.com/photos/1643381/pexels-photo-1643381.jpeg'
            ],
            name: 'Charming Villa Near the Beach',
            price: '$2,500,000',
            location: 'Beachside Haven',
            type: 'rentAndSale'
        }
    ];

    // Handle form field changes
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        if (id === 'selectedType') {
            // Set the selected type to the value of the checked checkbox
            setFormData((prev) => ({
                ...prev,
                selectedType: checked ? value : '' // Clear the value if unchecked
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: type === 'checkbox' ? checked : value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.heading}>Property Search</h2>
                <div className={styles.search}>
                    <label htmlFor="searchTerm">Search term:</label>
                    <input
                        type="text"
                        id="searchTerm"
                        placeholder="Search properties"
                        value={formData.searchTerm}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.searchCheckboxes}>
                    <div className={styles.checkboxContainer}>
                        <p>Type:</p>
                        <div className={styles.checkboxGroup}>
                            {['rentAndSale', 'rent', 'sale'].map((type) => (
                                <div key={type} className={styles.checkBox}>
                                    <input
                                        type="checkbox"
                                        id="selectedType"
                                        value={type}
                                        checked={formData.selectedType === type} // Check if type matches the selected type
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="selectedType">
                                        {type === 'rentAndSale' ? 'Rent & Sale' : type.charAt(0).toUpperCase() + type.slice(1)}
                                    </label>
                                </div>
                            ))}
                            <div key='offer' className={styles.checkBox}>
                                <input
                                    type="checkbox"
                                    id='offer'
                                    checked={formData.offer}
                                    onChange={handleChange}
                                />
                                <label htmlFor='offer'>
                                    Offer
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <p>Amenities:</p>
                        <div className={styles.checkboxGroup}>
                            <div key={'furnished'} className={styles.checkBox}>
                                <input
                                    type="checkbox"
                                    id={'furnished'}
                                    checked={formData.furnished}
                                    onChange={handleChange}
                                />
                                <label htmlFor='furnished'>
                                    Furnished
                                </label>
                            </div>
                            <div key={'parking'} className={styles.checkBox}>
                                <input
                                    type="checkbox"
                                    id={'parking'}
                                    checked={formData.parking}
                                    onChange={handleChange}
                                />
                                <label htmlFor='parking'>
                                    Parking
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sort}>
                    <label htmlFor="sortOption">Sort:</label>
                    <select id="sortOption" defaultValue='desc' value={formData.sortOption} onChange={handleChange}>
                        <option value="asec">Latest</option>
                        <option value="desc">Oldest</option>
                        <option value="price_desc">Price high to low</option>
                        <option value="price_asec">Price low to high</option>
                    </select>
                </div>
                <button className={styles.form_btn} type="submit">
                    SEARCH
                </button>
            </form>

            <div className={styles.results}>
                <div className={styles.gridContainer}>
                    {/* Display filtered results here */}
                    {sampleResults.length > 0 ? (
                        sampleResults.map((result) => (
                            <div key={result.id} className={styles.resultCard}>
                                <ImageSlider images={result.images} />
                                <div className={styles.resultInfo}>
                                    <div className={styles.resultName}>{result.name}</div>
                                    <div className={styles.resultPrice}>{result.price}</div>
                                    <div className={styles.resultLocation}>{result.location}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.resultsPlaceholder}>No results found</div>
                    )}
                </div>
            </div>
        </div>
    );
}
