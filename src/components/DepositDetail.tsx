import Edit from '../assets/images/RoomDetail/Edit copy.svg?react';
import { DepositInfo } from '../models/deposit.model';
import { getClosestFutureDate } from '../utils/getCloseDate';

interface DepositDetailProps {
  depositInfo: DepositInfo;
}

const DepositDetail = ({ depositInfo }: DepositDetailProps) => {
  const depositDate = getClosestFutureDate(depositInfo.depositAt.toString()).split('-'); // 19일 -> 2025-05-19로 변환 -> [2025, 05, 19]
  const month = depositDate[1].startsWith('0') ? depositDate[1].slice(1) : depositDate[1]; // 만약 0으로 시작한다면(05) 0 제거
  const day = depositDate[2].startsWith('0') ? depositDate[2].slice(1) : depositDate[2]; // 만약 0으로 시작한다면(05) 0 제거

  const amount = depositInfo.depositAmount.toLocaleString('ko-KR');

  return (
    <div className="py-[17px] px-4 rounded-xl border-2 border-solid border-gray-100 gap-[10px]">
      {/* 정보 */}
      <div className="flex flex-col text-body4 leading-[25px] tracking-[-0.042px]">
        <div className="flex gap-1">
          <p className="px-1 bg-primary_100 text-primary_700 rounded-[4px]">입금</p>
          <p className="text-gray-900 flex-1">{depositInfo.bankName}</p>
          <Edit />
        </div>
        <p className="text-gray-500 underline">{depositInfo.accountNumber}</p>
      </div>
      {/* 예정 입금액 */}
      <div className="pt-4 pb-2 flex-col flex justify-center items-center">
        <p className="text-body3 leading-7 font-semibold tracking-[-0.048px]">예정 입금액</p>
        <div className="flex items-center gap-[1px]">
          <span className="text-heading6 font-bold leading-10">{amount}</span>
          <span className="text-base leading-7 tracking-[-0.048px] font-semibold">원</span>
        </div>
      </div>
      {/* 예정 입금일 */}
      <div className="py-2 px-4 rounded-lg bg-gray-50 flex justify-between items-center">
        <p className="text-body4 leading-[25px] tracking-[-0.042px]">예정 입금일</p>
        <p className="font-semibold leading-7 tracking-[-0.048px]">
          {month}월 {day}일
        </p>
      </div>
    </div>
  );
};

export default DepositDetail;
