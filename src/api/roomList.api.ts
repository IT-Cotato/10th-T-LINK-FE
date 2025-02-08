import instance from './axios';
import { RoomInfo } from '../models/room.model';

// 과외방 전체 리스트 출력
export const getRoomList = async () => {
  const res = await instance.get('/api/v1/rooms');
  return res.data.rooms;
};

// 프로필 모달창 (프로픽 클릭 시)
export const getProfileModal = async (userId: number) => {
  const res = await instance.get(`/api/v1/users/${userId}/profile`);
  return res.data;
};

// 과외방 생성
export const postRoomInfo = async (roomInfo: RoomInfo) => {
  const res = await instance.post('/api/v1/rooms', roomInfo);
  return res;
};

// 선생님이 과외방 수정 시 과외방 정보 출력
export const getCurrentRoomInfo = async (roomId: number) => {
  const res = await instance.get(`/api/v1/rooms/${roomId}/info`);
  return res;
};

// 과외방 수정 - 선생님
export const patchRoomInfo = async (roomId: number, roomInfo: RoomInfo) => {
  const res = await instance.patch(`/api/v1/rooms/${roomId}`, roomInfo);
  return res.status;
};

// 과외방 수정 - 학생
export const patchRoomName = async (roomId: number, roomName: string) => {
  const res = await instance.patch(`/api/v1/rooms/${roomId}`, roomName);
  return res.status;
};

// 과외방 삭제
export const deleteRoom = async (roomId: number) => {
  const res = await instance.delete(`/api/v1/rooms/${roomId}`);
  return res.status;
};

// 과외방 상세
export const getRoomDetail = async (roomId: number) => {
  const res = await instance.get(`/api/v1/rooms/${roomId}`);
  return res.status;
};

// 공유 코드 조회
export const getShareCode = async (roomId: number) => {
  const res = await instance.get(`/api/v1/rooms/${roomId}/shareCode`);
  return res;
};

// 과외방 입장(공유코드로 입장)
export const postShareCode = async (shareCode: string) => {
  const res = await instance.get(`/api/v1/rooms/code/${shareCode}`);
  return res;
};
