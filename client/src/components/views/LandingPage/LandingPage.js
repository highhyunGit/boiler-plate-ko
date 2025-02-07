import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage(props) {

    // useEffect(() => {
    //     axios.get('/api/hello')
    //         .then(response => { console.log(response) })
    // }, [])
    useEffect(() => {
      axios.get('/api/hello') // /api/hello 경로로 요청
          .then(response => { 
              console.log("helllooooo~")
              console.log(response)
          })
          // .catch(error => {
          //     console.error('There was an error!', error);
          // });
  }, [])

    const onClickHandler = () => {
      console.log("logout~")
      axios.get('/api/users/logout')
        .then(response => {
          if(response.data.success){
            props.history.push("login")
          } else {
            alert("로그아웃하는데 실패하였습니다.")
          }
        })
    }

    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '100vh'
      }}>
        <h2>시작 페이지</h2>

        <button onclick={onClickHandler}>
          로그아웃
        </button>
      </div>
    )
}

export default LandingPage