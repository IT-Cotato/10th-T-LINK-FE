import { BankInfo, DepositInfo } from '../models/deposit.model';
import instance from './axios';

// 은행 목록 조회
export const getBankList = async () => {
  try {
    const response = await instance.get(`/api/v1/banks`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 입금일 생성 및 수정
export const putDeposit = async (roomId: string, payload: DepositInfo) => {
  try {
    const response = await instance.put(`/api/v1/rooms/${roomId}/deposit/modify`, payload);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
