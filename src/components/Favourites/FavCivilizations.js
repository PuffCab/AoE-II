import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Civilization from "../../components/Civilizations/Civilization";
import Loader from "../../components/Loader/Loader";
import { db } from "../../config";
import { AuthContext } from "../../context/AuthContext";

function FavCivilizations() {
  const { user, isUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favouriteCivilizations, setFavouriteCivilizations] = useState([]);

  const getFavourite = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "Favourites", `${user.email}`, "Civilizations")
      );
      const myFav = [];
      querySnapshot.forEach((doc) => {
        // console.log("doc :>> ", doc);
        // console.log(`${doc.id} => ${doc.data()}`);
        myFav.push(doc.data().fav);
      });
      console.log("myFav :>> ", myFav);
      // setFavourites(myFav);
      // myFav.map((fav) => {
      //   fetchFavourites(fav)
      // })
      fetchFavourites(myFav);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchFavourites = async (myFav) => {
    const favouritesArray = await Promise.all(
      myFav.map(async (fav) => {
        const url = `https://cab-cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${fav}`;

        const reponses = await fetch(url);
        const results = await reponses.json();
        console.log("results :>> ", results);
        return results;
      })
    );
    console.log("favouritesArray", favouritesArray);

    // myFav.map((fav) => {

    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((result) => {
    //       // console.log(result);
    //       test.push(result);
    //       // setFavouriteCivilizations(result);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //     });
    // })
    // console.log('test :>> ', test);
    //   // setLoading(false);
  };

  useEffect(() => {
    console.log("useEffect run", isUser, user);
    {
      isUser && getFavourite();
    }

    // setTimeout(setLoading(false), 5000);
  }, [isUser]);

  console.log(favouriteCivilizations);

  return (
    <>
      <h1 className="favouriteTitle">Favourite Civilizations</h1>
      {!loading ? (
        <div className="flex-container">
          {favouriteCivilizations &&
            favouriteCivilizations.map((civilization) => {
              return (
                <Civilization
                  key={civilization.id}
                  civilization={civilization}
                />
              );
            })}
        </div>
      ) : (
        <div className="loaderDiv">
          <Loader />
        </div>
      )}
    </>
  );
}

export default FavCivilizations;
