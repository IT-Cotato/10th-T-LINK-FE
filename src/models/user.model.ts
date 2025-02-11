export interface UserInfo {
  role: '선생님' | '학생' | '학부모' | '';
  username: string;
  phoneNumber: string;
  gender: '남성' | '여성' | '';
}

export interface UserCode {
  provider: 'KAKAO';
  redirectUrl: 'http://localhost:5173/api/auth/kakao/callback';
  code: string;
}
