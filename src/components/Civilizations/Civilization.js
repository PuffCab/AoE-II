import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Civilizations.css'
import FavouriteIcon from '../../Images/Icons/favourite1.png'
import FavouritedIcon from '../../Images/Icons/favourited.png'
import Info from '../../Images/Icons/info1.png'
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../config';

function Civilization({ civilization }) {

  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);

  const addFavourite = async () => {
    try {
      const docRef = await addDoc(collection(db, "Favourites", `${user.email}`, "Civilizations"), {
        fav: civilization.id,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    };

  const getFavourite = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Favourites", `${user.email}`, "Civilizations"));
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

    useEffect(() => {
        getFavourite();
        
  }, []);

  function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../Images/Civilizations', false, /\.(png|jpe?g|svg)$/));
  


  return (
    <>
      <div className="cardCiv">
        <img className="cardImgCiv" src={images[`${civilization.name}.png`]} alt={civilization.name}></img>
        <div className="cardBodyCiv">
          <h1 className="titleCiv">{civilization.name}</h1>
          {favourites && favourites.map(() => { return ( favourites.includes(civilization.id) ?  <Link style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}><img src={FavouritedIcon} alt="favourited" title="In your favourites" className="favouriteIconCiv"></img></Link> : <Link onClick={addFavourite} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}><img src={FavouriteIcon} alt="favourite" title="Add to favourites!" className="favouriteIconCiv"></img></Link>)})}
        </div>
        <Link to={`${civilization.id}`}><img src={Info} alt="info" title="More info" className="infoCiv"></img></Link>
      </div>
    </>
  )
}

export default Civilization