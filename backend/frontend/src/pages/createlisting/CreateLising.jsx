import React, { useEffect, useState } from 'react';
import style from '../EditLIsting/style.module.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const [files, setFiles] = useState(null);
  const [userData, setUserdata] = useState(false)
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: null,
    description: null,
    address: null,
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
    email: '',
    username: ''
  })


  const [loading, setLoading] = useState(false);
  const [submiterror, setSubmiterror] = useState(false)

  useEffect(() => {
    if (!userData) {
      getUser()
    }
  }, [userData])




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
      setUserdata(data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
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
        console.error("Error uploading images:", error);
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
      imageURLs: prevData.imageURLs.filter((url, i) => i !== index)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.userRef = userData._id
    formData.email = userData.email
    formData.username = userData.username
    if (!formData.discountedPrice) {
      formData.discountedPrice = formData.regularPrice
    }
    try {
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      navigate('/')
      setSubmiterror(false)
    } catch (error) {
      setSubmiterror(true)
    }

  };

  return (
    <div className={style.lisingContainerContainer}>
      <div className={style.lisingContainer}>
        <h2 className={style.heading}>CREATE LISTING</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.listingInputs}>
            <input className={style.textInput} type="text" id="name" placeholder="Name" onChange={handleInputChange} />
            <textarea className={`${style.textInput} ${style.textArea}`} id="description" placeholder="Description" onChange={handleInputChange} />
            <input className={style.textInput} type="text" id="address" placeholder="Address" onChange={handleInputChange} />

            <div className={style.checkBoxes}>
              <div className={style.checkBox}>
                <input type="checkbox" id="furnished" onChange={handleInputChange} />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className={style.checkBox}>
                <input type="checkbox" id="parking" onChange={handleInputChange} />
                <label htmlFor="parking">Parking spot</label>
              </div>
              <div className={style.checkBox}>
                <input type="checkbox" id="offer" onChange={handleInputChange} />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>

            <div className={style.numberInputs}>
              <div>
                <input className={style.numberInput} min={0} id="bedrooms" type="number" value={formData.bedrooms} onChange={handleInputChange} />
                <label className={style.numberLabel} htmlFor="bedrooms">Bedrooms</label>
              </div>
              <div>
                <input className={style.numberInput} min={0} id="bathrooms" type="number" value={formData.bathrooms} onChange={handleInputChange} />
                <label className={style.numberLabel} htmlFor="bathrooms">Bathrooms</label>
              </div>
              <div>
                <input className={style.numberInput} id="regularPrice" type="number" value={formData.regularPrice} onChange={handleInputChange} />
                <label className={style.numberLabel} htmlFor="regularPrice">Regular Price</label>
              </div>
              {formData.offer ? (
                <div>
                  <input className={style.numberInput} id="discountedPrice" type="number" value={formData.discountedPrice} onChange={handleInputChange} />
                  <label className={style.numberLabel} htmlFor="discountedPrice">Discounted Price</label>
                </div>
              ) : ''}
            </div>
            <input className={style.textInput} type="text" id="type" placeholder="Type" onChange={handleInputChange} />
          </div>
          <div className={style.imagePart}>
            <p>The first image will be the cover image (max=6)</p>
            <div className={style.flexlast}>
              <input type="file" className={style.inputIMG} multiple onChange={(e) => setFiles(e.target.files)} />
              <button type="button" onClick={handleImageUpload} className={style.uploadLabel}>
                {loading ? 'Uploading...' : 'Upload photos'}
              </button>
            </div>
            <div className={style.contimg}>
              {formData.imageURLs.length > 0 &&
                formData.imageURLs.map((image, index) => (
                  <div className={style.listing_imgs} key={index}>
                    <img className={style.listing_images} src={image} alt={`Listing ${index}`} />
                    <button className={style.delbutton} type="button" onClick={() => handleImageRemove(index)}>
                      delete
                    </button>
                  </div>
                ))}
            </div>

            <button onClick={handleSubmit} className={style.submitButton} type="submit">Upload Listing</button>
            {submiterror ? <p className={fail}>Error submiting Listing</p> : ''}
          </div>
        </form>
      </div>
    </div>
  );
}
