import { Room, RoomInfo, RoomName } from '../models/room.model';
import getAPIResponseData from '../utils/getAPIResponseData';

// 과외방 전체 리스트 출력
export const getRoomList = async () => {
  return await getAPIResponseData({
    url: '/api/v1/rooms',
    method: 'GET',
  });
};

// 프로필 모달창 (프로필 클릭 시)
export const getProfileModal = async (userId: number) => {
  return await getAPIResponseData({
    url: `/api/v1/user/${userId}/profile`,
    method: 'GET',
  });
};

// 과외방 생성
export const postRoomInfo = async (roomInfo: RoomInfo) => {
  return await getAPIResponseData({
    url: '/api/v1/rooms',
    method: 'POST',
    data: roomInfo,
  });
};

// 선생님이 과외방 수정 시 과외방 정보 출력
export const getCurrentRoomInfo = async (roomId: number) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/info`,
    method: 'GET',
  });
};

// 과외방 수정 - 선생님
export const patchRoomInfo = async (roomId: number, roomInfo: Room) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}`,
    method: 'PATCH',
    data: roomInfo,
  });
};

// 과외방 수정 - 학생
export const patchRoomName = async (roomId: number, roomName: RoomName) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}`,
    method: 'PATCH',
    data: roomName,
  });
};

// 과외방 삭제
export const deleteRoom = async (roomId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}`,
    method: 'DELETE',
  });
};

// 과외방 상세 조회
export const getRoomDetail = async (roomId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}`,
    method: 'GET',
  });
};

// 공유 코드 조회
export const getShareCode = async (roomId: number) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/shareCode`,
    method: 'GET',
  });
};

// 공유 코드로 방 정보 조회
export const getRoomInfo = async (shareCode: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/code/${shareCode}`,
    method: 'GET',
  });
};

// 과외방 입장(공유코드로 입장)
export const postShareCode = async (shareCode: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/code/${shareCode}`,
    method: 'POST',
    data: {},
  });
};
