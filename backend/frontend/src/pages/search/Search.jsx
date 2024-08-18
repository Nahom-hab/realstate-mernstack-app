import React, { useEffect, useState } from 'react';
import styles from './style.module.css'; // Import CSS module
import { useNavigate, useLocation } from 'react-router-dom';
import ListingCard from '../../component/listingCard/ListingCard';


export default function Search() {
    const navigate = useNavigate();
    const location = useLocation(); // Correctly use useLocation
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        searchTerm: '',
        selectedType: 'all',
        offer: false,
        furnished: false,
        parking: false,
        sort: 'createdAt',
        order: 'desc'
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingTermFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const optionFromUrl = urlParams.get('option');

        if (
            searchTermFromUrl ||
            parkingTermFromUrl ||
            typeFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            optionFromUrl ||
            sortFromUrl
        ) {
            setFormData({
                searchTerm: searchTermFromUrl || '',
                selectedType: typeFromUrl || 'all',
                parking: parkingTermFromUrl === 'true',
                furnished: furnishedFromUrl === 'true',
                offer: offerFromUrl === 'true',
                sort: sortFromUrl || 'createdAt',
                order: optionFromUrl || 'desc'
            });
        }
        const fetchdata = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get?${urlParams.toString()}`)
                if (res.ok) {
                    const Listings = await res.json();
                    setListing(Listings);

                }

                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        };
        fetchdata();

    }, [location.search]);

    const sampleResults = [];

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        if (id === 'selectedType') {
            setFormData((prev) => ({
                ...prev,
                selectedType: checked ? value : 'all'
            }));
        } else if (id === 'sortOption') {
            const [sort, order] = value.split('_');
            setFormData((prev) => ({
                ...prev,
                sort,
                order
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', formData.searchTerm);
        urlParams.set('type', formData.selectedType);
        urlParams.set('parking', formData.parking);
        urlParams.set('furnished', formData.furnished); // Fixed typo
        urlParams.set('offer', formData.offer);
        urlParams.set('sort', formData.sort);
        urlParams.set('option', formData.order); // Corrected key to match formData

        navigate(`/search?${urlParams.toString()}`);
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
                            {['all', 'rent', 'sale'].map((type) => (
                                <div key={type} className={styles.checkBox}>
                                    <input
                                        type="checkbox"
                                        id="selectedType"
                                        value={type}
                                        checked={formData.selectedType === type} // Check if type matches the selected type
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="selectedType">
                                        {type === 'all' ? 'Rent & Sale' : type.charAt(0).toUpperCase() + type.slice(1)}
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
                    <select id="sortOption" value={`${formData.sort}_${formData.order}`} onChange={handleChange}>
                        <option value="createdAt_asc">Latest</option>
                        <option value="createdAt_desc">Oldest</option>
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                    </select>
                </div>
                <button className={styles.form_btn} type="submit">
                    SEARCH
                </button>
            </form>
            <ListingCard listing={listing} />


        </div>
    );
}
