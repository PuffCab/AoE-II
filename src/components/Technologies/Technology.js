import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Info from "../../Images/Icons/info1.png";
import FavouriteIcon from "../../Images/Icons/favourite1.png";
import FavouritedIcon from "../../Images/Icons/favourited1.png";
import { HashLink } from "react-router-hash-link";
import {
  addDoc,
  collection,
  deleteField,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../config";
import ChatTech from "../Chat/ChatTech";

function Technology({ technology }) {
  const { user } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    fetchDevelopsIn(technology.develops_in);
  };
  const [developsIn, setDevelopsIn] = useState([]);
  const [favourites, setFavourites] = useState(null);

  const fetchDevelopsIn = (url2) => {
    const url = `https://cab-cors-anywhere.herokuapp.com/${url2}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 1) {
          setDevelopsIn(result[0]);
        } else {
          setDevelopsIn(result);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const addFavourite = async () => {
    try {
      const docRef = await addDoc(
        collection(db, "Favourites", `${user.email}`, "Technologies"),
        {
          fav: technology.id,
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getFavourite = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "Favourites", `${user.email}`, "Technologies")
      );
      const myFav = [];
      querySnapshot.forEach((doc) => {
        // console.log("doc :>> ", doc);
        // console.log(`${doc.id} => ${doc.data()}`);
        myFav.push(doc.data().fav);
      });
      //   console.log("myFav :>> ", myFav);
      setFavourites(myFav);
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeFavourite = async () => {
    try {
      const docRef = await updateDoc(
        collection(db, "Favourites", `${user.email}`, "Technologies"),
        {
          fav: deleteField()
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


  useEffect(() => {
    getFavourite();
  }, []);

  return (
    <>
      <tr key={technology.id}>
        <td
          style={{
            border: "1px solid black",
            color: "#ede6c9",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
          id={technology.id}
        >
          {technology.id}
        </td>
        <td style={{ border: "1px solid black", fontWeight: "600" }}>
          {technology.name}
        </td>
        <td style={{ border: "1px solid black" }}>{technology.description}</td>
        <Link onClick={handleShow}>
          <img
            src={Info}
            alt="info"
            title="More info"
            className="infoImg"
          ></img>
        </Link>
      </tr>

      <Modal show={show} onHide={handleClose}>
        <div className="modalBackground">
          <Modal.Header closeButton className="modalHeader">
            <Modal.Title>{technology.name}</Modal.Title>
            {favourites &&
                                  favourites.map(() => {
                                      return (
                           favourites.includes(technology.id) ? 
                      <Link onClick={removeFavourite}><img
                    src={FavouritedIcon}
                    alt="favourited"
                    title="In your favourites"
                    className="favouriteIconTech"
                  ></img></Link>
                  :  
                      <Link onClick={addFavourite}><img
                    src={FavouriteIcon}
                    alt="favourite"
                    title="Add to favourites!"
                    className="favouriteIconTech"
                  ></img></Link>)})}
          </Modal.Header>
          <Modal.Body>
            <div className="inlineTags">
              <h3 className="classInfo">Age:</h3>
              <p className="textInfo">{technology.age}</p>
            </div>
            <div className="inlineTags">
              <h3 className="classInfo">Expansion:</h3>
              <p className="textInfo">{technology.expansion}</p>
            </div>
            <div className="inlineTags">
              <h3 className="classInfo">Build Time:</h3>
              <p className="textInfo">{technology.build_time}</p>
            </div>
            <div className="inlineTags">
              <h3 className="classInfo">Develops In:</h3>
              <HashLink
                to={`/structures/#${developsIn.id}`}
                className="textInfo"
              >
                {developsIn.name}
              </HashLink>
            </div>
          </Modal.Body>
                <Modal.Footer></Modal.Footer>
          <ChatTech technology={technology} />
        </div>
      </Modal>
    </>
  );
}

export default Technology;
