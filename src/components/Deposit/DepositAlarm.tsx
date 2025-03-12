import { useState } from 'react';
import ToggleSwitch from '../Room/ToggleSwitch';

const DepositAlarm = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <p className="text-body1 font-bold leading-9 text-gray-900 tracking-[-0.4px]">
        카카오톡 알림 설정하기
      </p>
      <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600 border-b-[1px] border-gray-200 pb-4">
        입금일 1일 전, 학부모님께 알림을 보내드려요!
      </p>

      {/* 토글 */}
      <div className="flex w-full justify-between font-normal text-base leading-7 mt-2 tracking-[-0.048px]">
        <h1 className={`${isChecked ? 'text-gray-900' : 'text-gray-500'}`}>입금일 알림</h1>
        <ToggleSwitch
          id="deposit"
          onChange={() => setIsChecked(!isChecked)}
          isChecked={isChecked}
        />
      </div>
    </div>
  );
};

export default DepositAlarm;
