import React, { useContext, useEffect, useState } from 'react'
import './Units.css'
import { Link } from 'react-router-dom';
import FavouriteIcon from '../../Images/Icons/favourite1.png'
import FavouritedIcon from '../../Images/Icons/favourited1.png'
import Info from '../../Images/Icons/info1.png'
import { db } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function Unit({ unit }) {

  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);

  const addFavourite = async () => {
    try {
      const docRef = await addDoc(collection(db, "Favourites", `${user.email}`, "Units"), {
        fav: unit.id,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    };

  const getFavourite = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Favourites", `${user.email}`, "Units"));
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

  const images = importAll(require.context('../../Images/Units', false, /\.(png|jpe?g|svg)$/));

  return (
    <>
      <div className="cardUnit">
        <img className="cardImgUnit" src={images[`${unit.id}.png`]} alt={unit.name}></img>
        <div className="cardBodyUnit">
          <h1 className="titleUnit">{unit.name}</h1>
           {favourites && favourites.map(() => { return ( favourites.includes(unit.id) ?  <Link style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}><img src={FavouritedIcon} alt="favourited" title="In your favourites" className="favouriteIconCiv"></img></Link> : <Link onClick={addFavourite} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}><img src={FavouriteIcon} alt="favourite" title="Add to favourites!" className="favouriteIconCiv"></img></Link>)})}
        </div>
        <Link to={`${unit.id}`}><img src={Info} alt="info" title="More info" className="infoUnits"></img></Link>
      </div>
    </>
  )
}

export default Unit