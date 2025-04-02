import { DepositInfo } from '../models/deposit.model';
import instance from './axios';

// 은행 목록 조회
export const getBankList = async () => {
  const response = await instance.get(`/api/v1/banks`);
  if (response.status == 200) {
    return response.data;
  }
};

// 입금일 생성 및 수정
export const putDeposit = async (roomId: string, payload: DepositInfo) => {
  const response = await instance.put(`/api/v1/rooms/${roomId}/deposit/modify`, payload);
  if (response.status == 200) {
    return response.data;
  }
};

// 입금일 상세 조회
export const getDeposit = async (roomId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/deposit`);
  if (response.status == 200) {
    return response.data;
  }
};

// 입금일 수정을 위한 상세조회
export const getDepositDetail = async (roomId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/deposit/modify`);
  if (response.status == 200) {
    return response.data;
  }
};
