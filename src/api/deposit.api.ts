import { BankInfo, DepositInfo } from '../models/deposit.model';
import getAPIResponseData from '../utils/getAPIResponseData';

// 은행 목록 조회
export const getBankList = async () => {
  return await getAPIResponseData<{ banks: BankInfo[] }>({
    url: `/api/v1/banks`,
    method: 'GET',
  });
};

// 입금일 생성 및 수정
export const putDeposit = async (roomId: string, payload: DepositInfo) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/deposit/modify`,
    method: 'PUT',
    data: payload,
  });
};

// 입금일 상세 조회
export const getDeposit = async (roomId: string) => {
  return await getAPIResponseData<DepositInfo>({
    url: `/api/v1/rooms/${roomId}/deposit`,
    method: 'GET',
  });
};

// 입금일 수정을 위한 상세 조회
export const getDepositDetail = async (roomId: string) => {
  return await getAPIResponseData<BankInfo>({
    url: `/api/v1/rooms/${roomId}/deposit/modify`,
    method: 'GET',
  });
};
