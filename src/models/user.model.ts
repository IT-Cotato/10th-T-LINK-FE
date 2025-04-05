export interface UserInfo {
  role: '선생님' | '학생' | '학부모' | '';
  username: string;
  phoneNumber: string;
  gender: '남성' | '여성' | '';
}

export interface UserCode {
  provider: 'KAKAO';
  redirectUrl: string;
  code: string;
}

export interface MyPageUserInfo {
  role: string;
  username: string;
  statusMessage: string;
  phoneNumber: string;
  profileUrl: string;
}

// 백에서 넘기는 이름이 달라서 새로 만듦
export interface ProfileInfo {
  role: string;
  username: string;
  statusMessage: string;
  phoneNumber: string;
  profileImageUrl: string;
}
