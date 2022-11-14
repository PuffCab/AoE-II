import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Info from '../../Images/Icons/info1.png'
import FavouriteIcon from '../../Images/Icons/favourite1.png'
import FavouritedIcon from '../../Images/Icons/favourited1.png'
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../config';
import ChatStruc from '../Chat/ChatStruc';

function Structure({ structure }) {

    const { user } = useContext(AuthContext);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [favourites, setFavourites] = useState([]);

    const addFavourite = async () => {
    try {
      const docRef = await addDoc(collection(db, "Favourites", `${user.email}`, "Structures"), {
        fav: structure.id,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    };

  const getFavourite = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Favourites", `${user.email}`, "Structures"));
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
    
  return (
      <>
          <tr key={structure.id}>
            <td style={{border: "1px solid black", color: "#ede6c9", fontWeight: "bold", textDecoration: "underline"}} id={structure.id}>{structure.id}</td>
            <td style={{border: "1px solid black", fontWeight: "600"}}>{structure.name}</td>
            <td style={{border: "1px solid black"}}>{structure.age}</td>
        <Link onClick={handleShow}><img src={Info} alt="info" title="More info" className="infoImg"></img></Link>
        </tr>
        
      <Modal show={show} onHide={handleClose}>
                <div className="modalBackground">
                <Modal.Header closeButton className="modalHeader">
                    <Modal.Title>{structure.name}</Modal.Title>
                    {favourites &&
                                  favourites.map(() => {
                                      return (
                           favourites.includes(structure.id) ? 
                      <Link onClick={addFavourite}><img
                    src={FavouritedIcon}
                    alt="favourited"
                    title="In your favourites"
                    className="favouriteIconTech"
                  ></img></Link>
                  :  
                      <Link><img
                    src={FavouriteIcon}
                    alt="favourite"
                    title="Add to favourites!"
                    className="favouriteIconTech"
                  ></img></Link>)})}
                </Modal.Header>
                <Modal.Body>
                    <div className="inlineTags"><h3 className="classInfo">Expansion:</h3><p className="textInfo">{structure.expansion}</p></div>
                    <div className="inlineTags"><h3 className="classInfo">Build Time:</h3><p className="textInfo">{structure.build_time}</p></div>
                    <div className="inlineTags"><h3 className="classInfo">Hit Points:</h3><p className="textInfo">{structure.hit_points}</p></div>
                    <div className="inlineTags"><h3 className="classInfo">Line of Sight:</h3><p className="textInfo">{structure.line_of_sight}</p></div>
                </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                  <ChatStruc structure={structure} />
                </div>
            </Modal>
      </>
  )
}

export default Structure