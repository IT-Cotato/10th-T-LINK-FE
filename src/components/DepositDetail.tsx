import Edit from '../assets/images/RoomDetail/Edit copy.svg?react';

const DepositDetail = () => {
  return (
    <div className="py-[17px] px-4 rounded-xl border-2 border-solid border-gray-100 gap-[10px]">
      {/* 정보 */}
      <div className="flex flex-col text-body4 leading-[25px] tracking-[-0.042px]">
        <div className="flex gap-1">
          <p className="px-1 bg-primary_100 text-primary_700 rounded-[4px]">입금</p>
          <p className="text-gray-900 flex-1">하나은행</p>
          <Edit />
        </div>
        <p className="text-gray-500 underline">123-12-12-12341234</p>
      </div>
      {/* 예정 입금액 */}
      <div className="pt-4 pb-2 flex-col flex justify-center items-center">
        <p className="text-body3 leading-7 font-semibold tracking-[-0.048px]">예정 입금액</p>
        <div className="flex items-center gap-[1px]">
          <span className="text-heading6 font-bold leading-10">300,000</span>
          <span className="text-base leading-7 tracking-[-0.048px] font-semibold">원</span>
        </div>
      </div>
      {/* 예정 입금일 */}
      <div className="py-2 px-4 rounded-lg bg-gray-50 flex justify-between items-center">
        <p className="text-body4 leading-[25px] tracking-[-0.042px]">예정 입금일</p>
        <p className="font-semibold leading-7 tracking-[-0.048px]">5월 30일</p>
      </div>
    </div>
  );
};

export default DepositDetail;
