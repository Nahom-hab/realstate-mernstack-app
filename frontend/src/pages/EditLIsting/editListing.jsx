import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function EditListing() {
  const [files, setFiles] = useState(null);
  const [userData, setUserData] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: '',
    discountedPrice: '',
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
    imageURLs: [],
    type: '',
    userRef: '',
  });

  useEffect(() => {
    const id = params.id;
    const getListing = async () => {
      try {
        const res = await fetch(`/api/listing/getlisting/${id}`);
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const listing = await res.json();
        setFormData(listing);
      } catch (error) {
        console.error(error.message);
      }
    };
    getListing();
  }, [params.id]);

  useEffect(() => {
    if (!userData) {
      getUser();
    }
  }, [userData]);

  const getUser = async () => {
    try {
      const res = await fetch('/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser.email }),
      });
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = () => {
    if (!files || files.length === 0) return;

    setLoading(true);
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(storeImage(files[i]));
    }
    Promise.all(promises)
      .then((urls) => {
        console.log('Uploaded image URLs:', urls);
        setFormData((prevData) => ({ ...prevData, imageURLs: [...prevData.imageURLs, ...urls] }));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error uploading images:', error);
        setLoading(false);
      });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Error uploading file', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      imageURLs: prevData.imageURLs.filter((url, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.userRef = userData._id;
    if (!formData.discountedPrice) {
      formData.discountedPrice = formData.regularPrice;
    }
    try {
      const res = await fetch(`/api/listing/editListing/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      navigate('/profile');
      setSubmitError(false);
    } catch (error) {
      setSubmitError(true);
    }
  };

  return (
    <div className={style.lisingContainer}>
      <h2 className={style.heading}>EDIT LISTING</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.listingInputs}>
          <input
            className={style.textInput}
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            className={style.textInput}
            type="text"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <input
            className={style.textInput}
            type="text"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />

          <div className={style.checkBoxes}>
            <div className={style.checkBox}>
              <input
                type="checkbox"
                id="furnished"
                checked={formData.furnished}
                onChange={handleInputChange}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className={style.checkBox}>
              <input
                type="checkbox"
                id="parking"
                checked={formData.parking}
                onChange={handleInputChange}
              />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className={style.checkBox}>
              <input
                type="checkbox"
                id="offer"
                checked={formData.offer}
                onChange={handleInputChange}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className={style.numberInputs}>
            <div>
              <input
                className={style.numberInput}
                min={0}
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleInputChange}
                required
              />
              <label className={style.numberLabel} htmlFor="bedrooms">
                Bedrooms
              </label>
            </div>
            <div>
              <input
                className={style.numberInput}
                min={0}
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleInputChange}
                required
              />
              <label className={style.numberLabel} htmlFor="bathrooms">
                Bathrooms
              </label>
            </div>
            <div>
              <input
                className={style.numberInput}
                id="regularPrice"
                type="number"
                value={formData.regularPrice}
                onChange={handleInputChange}
                required
              />
              <label className={style.numberLabel} htmlFor="regularPrice">
                Regular Price
              </label>
            </div>
            {formData.offer ? (
              <div>
                <input
                  className={style.numberInput}
                  id="discountedPrice"
                  type="number"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                />
                <label className={style.numberLabel} htmlFor="discountedPrice">
                  Discounted Price
                </label>
              </div>
            ) : null}
          </div>
          <input
            className={style.textInput}
            type="text"
            id="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <p>The first image will be the cover image (max=6)</p>
        <div className={style.flex}>
          <input
            type="file"
            className={style.inputIMG}
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={handleImageUpload}
            className={style.uploadLabel}
          >
            {loading ? 'Uploading...' : 'Upload photos'}
          </button>
        </div>
        {formData.imageURLs.length > 0 &&
          formData.imageURLs.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Listing ${index}`} />
              <button type="button" onClick={() => handleImageRemove(index)}>
                delete
              </button>
            </div>
          ))}
        <button className={style.submitButton} type="submit">
          Update Listing
        </button>
        {submitError && <p className={style.fail}>Error submitting Listing</p>}
      </form>
    </div>
  );
}
