import instance from './axios';

export const postAuthCode = async (code: string) => {
  const res = await instance.post('/login', code); // 백에서 주는 url

  return res.data;
};

export const postRole = async (role: string) => {
  const res = await instance.post('/signup', role); // 백에서 주는 url
  return res.data;
};
