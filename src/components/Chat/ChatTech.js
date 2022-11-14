import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import './Chat.css'

function ChatTech({technology}) {
    const { user } = useContext(AuthContext);
    
    const [chatComments, setChatComments] = useState([]);
    const [comment, setComment] = useState("");


    const getComments = async () => {
        const q = query(collection(db, "Comments", "Technologies", `Technology id-${technology.id}`), orderBy("date"));
        onSnapshot(q, (querySnapshot) => {
            const myComments = [];
            querySnapshot.forEach((doc) => {
                myComments.push(doc.data());
            });
            setChatComments(myComments);
        });
    };
    
    const commentDate = (date) => {
        return new Date(date * 1000).toLocaleString();
    };
    
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    
    const handleSubmitComment = async () => {
        try {
            const docRef = await addDoc(collection(db, "Comments", "Technologies", `Technology id-${technology.id}`), {
                text: comment,
                date: new Date(),
                author: user.email,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setComment("");
    };
    
    useEffect(() => {
        getComments();
    }, []);

    
  return (
      <>
          <div className="commentDiv">
              {chatComments && chatComments.map((comment, index) => {
                  if (comment.author === user.email) {
                      return (
                          <div key={index} className="ownComments">
                              <p className="author">{comment.author}</p>
                              <p className="text">{comment.text}</p>
                              <p className="date">{commentDate(comment.date.seconds)}</p>
                          </div>);
                  } else {
                       return (
                          <div key={index} className="comments">
                              <p className="author">{comment.author}</p>
                              <p className="text">{comment.text}</p>
                              <p className="date">{commentDate(comment.date.seconds)}</p>
                          </div>);
                  }
              })}
              
              <div className="submit">
                  <input type="text" value={comment} className="submitInput" name="chat" onChange={handleCommentChange} placeholder="Write your comment" />
                  <button  className="submitButton"onClick={handleSubmitComment}>Post</button>
              </div>
          </div>
      </>
  )
}

export default ChatTech