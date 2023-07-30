import React, { useState,useEffect } from 'react'
import './AllData.scss'
import user from "./user.avif"
import db from "../../firebase/firebaseConfig"
const userInfo = db.collection('userInfo');



const AllData = () => {
  const [userdetails,setUserInfo]=useState([])
  const [loader,setLoader]=useState([])
  useEffect(()=>{
    const fetchUserInfo = async () => {
      try {
        const querySnapshot = await db.collection('userInfo').get();
        let documents=[]
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const data = doc.data();
            documents.push(data.info)
            setUserInfo(documents);
           
          } else {
            console.log('Document not found.');
          }
          setLoader(false);
        });
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    fetchUserInfo();

  
    },[])
     console.log(userdetails.length)
      const DisplayData=userdetails.map((item)=>{
        return(
          <div className='cardlist_container'>
          <div className='card_wrapper'>
            <div className='card_circle'>
              <img src={user}/>
            </div>
            <div className='card_title'>
              <h1>{item?.name}</h1>
            </div>
            <div className='para'>
             {item?.selected&&item?.selected.map((list)=><span>{list}, </span>)}
            </div>
          </div>
        </div>
        )
      })
    
  return (
    <div className='vr_feature_container'>
       {userdetails.length>0? <h1 style={{textAlign:'center',paddingTop:'30px'}}>All User Data Available</h1>: <h1 style={{textAlign:'center',paddingTop:'30px'}}>No Data Available</h1>}
      <div className='vr_features'>
     {userdetails&&DisplayData}
    </div>
    </div>
  )
}

export default AllData
