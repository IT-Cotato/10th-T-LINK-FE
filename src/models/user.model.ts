export interface UserInfo {
  role: '선생님' | '학생' | '부모' | '';
  username: string;
  phoneNumber: string;
  gender: '남' | '여' | '';
  backgroundColor: string;
}

export interface UserCode {
  provider: 'KAKAO';
  redirectUrl: 'http://localhost:5173/api/auth/kakao/callback';
  code: string;
}
