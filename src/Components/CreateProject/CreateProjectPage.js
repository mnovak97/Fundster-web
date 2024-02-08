import {React, useEffect, useState } from 'react'
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import "./CreateProjectPage.css"
import CookieUtils from '../../Helper/CookieHelper';

const CreateProjectPage = ({closeModal}) => {

  const firebaseConfig = {
    apiKey: "AIzaSyByDs1h968jp_kxQ7iJjOQJJ2IN39K8Owk",
    authDomain: "fundster-f5983.firebaseapp.com",
    projectId: "fundster-f5983",
    storageBucket: "fundster-f5983.appspot.com",
    messagingSenderId: "246418358575",
    appId: "1:246418358575:web:c968ca22c095b4be6061da",
    measurementId: "G-5FXDBNKH4D"
  };
  const app = initializeApp(firebaseConfig);
  const cookieHelper = new CookieUtils();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        backers: "",
        moneyAcquired: "",
        moneyGoal: "",
        projectPictureUrl: "",
        userID: "",
      });

    const storage = getStorage();
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage)
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = cookieHelper.getCookie('userToken')
      const decoded = cookieHelper.parseJwt(token)
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (image) {
        const imageRef = storageRef(storage, `projectImages/${image.name}`);
        try {
          const snapshot = await uploadBytes(imageRef, image);
          const url = await getDownloadURL(snapshot.ref);
          const response = await axios.post(
            'http://localhost:8080/api/projects',
            {
              ...formData,
              projectPictureUrl: url,
              userID: decoded.user_id
            },
            {
              headers: headers,
            }
          );
    
          if (response.status === 201) {
            console.log("Project creation successful!", response.data);
          };
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
      
    };
    

  return (
    <div className="container">
    <h2>Create new project</h2>
    <form onSubmit={handleSubmit} className="new-project-form">
      <label>Project name:</label>
      <input
        name="name"
        type="text"
        autoComplete="off"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <label>Description:</label>
      <input
        name="description"
        type="text"
        autoComplete="off"
        onChange={handleChange}
        value={formData.description}
        required
      />

      <label>
        Money goal:
      </label>
      <input
        name="moneyGoal"
        type="number"
        autoComplete="off"
        onChange={handleChange}
        value={formData.moneyGoal}
        required
      />

      <label>
        Deadline:
      </label>
      <input
        type="datetime-local"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />
      <label>Project Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button type="submit">
        Create new project
      </button>
    </form>
  </div>
  )
}

export default CreateProjectPage