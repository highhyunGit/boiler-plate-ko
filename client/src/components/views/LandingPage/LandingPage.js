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
          .catch(error => {
              console.error('There was an error!', error);
          });
  }, [])

    return (
      <div>
        Landddding dingdingding 괜차나

      </div>
    )
}

export default LandingPage