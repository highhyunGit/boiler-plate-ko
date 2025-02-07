import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {
  // loginUser
    const request = axios.post('/api/users/login', dataToSubmit)
      .then(response => {
        console.log("서버 응답:", response);  // 서버 응답 구조 확인
        return response.data;  // 서버에서 반환하는 데이터
      })
      .catch(error => {
        console.error('로그인 오류 발생:', error);
        return { loginSuccess: false, message: "로그인 중 오류가 발생했습니다." };
      });

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
  const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => {
      console.log("서버 응답:", response);  // 서버 응답 구조 확인
      return response.data;  // 서버에서 반환하는 데이터
    })
    .catch(error => {
      console.error('로그인 오류 발생:', error);
      return { loginSuccess: false, message: "로그인 중 오류가 발생했습니다." };
    });

  return {
      type: REGISTER_USER,
      payload: request
  }

}

export function auth(dataToSubmit) {
    const request = axios.post('/api/users/auth')
      .then(response => response.data)
  
    return {
        type: AUTH_USER,
        payload: request
    }
  }