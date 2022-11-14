import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import Loader from '../components/Loader/Loader';
import { HashLink } from 'react-router-hash-link';
import ChatUnits from '../components/Chat/ChatUnits';
import { AuthContext } from '../context/AuthContext';

function DetailedUnit() {

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [detailedUnit, setDetailedUnit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createdIn, setCreatedIn] = useState([]);

  function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../Images/Units', false, /\.(png|jpe?g|svg)$/));
  
  const fetchUnit = () => {
        const url = `https://cab-cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/unit/${id}`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setDetailedUnit(result);
                fetchCreatedIn(result.created_in);
                // setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
  }

  const fetchCreatedIn = (url2) => {
        const url = `https://cab-cors-anywhere.herokuapp.com/${url2}`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
              if (result.length > 1) {
                setCreatedIn(result[0]);
              } else {
                setCreatedIn(result);
              }
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
  }



  useEffect(() => {
    fetchUnit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="backgroundDiv">
        <br /><br />

        {!loading ? (
              <div className="detailedDiv">
          <h1 className="detailedTitle">{detailedUnit.name}</h1>
        <div className="detailedInfo">
            <div className="div1">
              <div className="detailedInfo">
              <p className="classInfo">Description:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.description}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Expansion:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.expansion}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Age:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.age}</p>
            </div>
            {detailedUnit.attack_bonus ? <div className="detailedInfo">
                <p className="classInfo">Attack Bonus:&nbsp;&nbsp; </p>
                   <div>
                    {detailedUnit?.attack_bonus.map((bonus) => {
                      return <ul className="textInfo">{bonus}</ul>
                    })}
                  </div>
              </div> : null}
              {createdIn ? <div className="detailedInfo">
                  <p className="classInfo">Created In:&nbsp;&nbsp;&nbsp; </p><HashLink to={`/structures/#${createdIn.id}`} className="textInfo">{createdIn.name}</HashLink>
                </div> : null}
            </div>
              <img className="detailedImgCiv" src={images[`${detailedUnit.id}.png`]} alt={detailedUnit.name}></img>
          </div>
          <div className="detailedInfoList">
            <div>
                {detailedUnit.build_time ? <div className="detailedInfoList">
                  <p className="classInfo">Build Time:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.build_time}</p>
                </div> : null}
                {detailedUnit.reload_time ? <div className="detailedInfoList">
                  <p className="classInfo">Reload Time:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.reload_time}</p>
                </div> : null}
                {detailedUnit.attack_delay ? <div className="detailedInfoList">
                  <p className="classInfo">Attack Delay:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.attack_delay}</p>
                </div> : null}
          <div className="detailedInfoList">
              <p className="classInfo">Movement Rate:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.movement_rate}</p>
          </div>
            </div>
            <div>
              <div className="detailedInfoList">
              <p className="classInfo">Line of Sight:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.line_of_sight}</p>
          </div>
          <div className="detailedInfoList">
              <p className="classInfo">Hit Points:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.hit_points}</p>
          </div>
                {detailedUnit.range ? <div className="detailedInfoList">
                  <p className="classInfo">Range:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.range}</p>
                </div> : null}
                {detailedUnit.attack ? <div className="detailedInfoList">
                  <p className="classInfo">Attack:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.attack}</p>
                </div> : null}
              </div>
              <div>
                {detailedUnit.armor ? <div className="detailedInfoList">
                  <p className="classInfo">Armor:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.armor}</p>
                </div> : null}
          {detailedUnit.accuracy ? <div className="detailedInfoList">
              <p className="classInfo">Accuracy:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.accuracy}</p>
          </div> : null}
            </div>
            </div>

          { user ? <hr className="hr3"></hr> : null}

          { user ? <ChatUnits detailedUnit={detailedUnit} /> : null}

          </div>
            ) : (
              <div className="loaderDiv">
                <Loader />
              </div>
          )}
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </>
  )
}

export default DetailedUnit