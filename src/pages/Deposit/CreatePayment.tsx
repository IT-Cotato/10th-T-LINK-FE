import { useEffect, useState } from 'react';
import PickDate from '../../components/RoomDetail/PickDate';
import Input from '../../components/RoomDetail/Input';
import ChooseBank from '../../components/Deposit/ChooseBank';
import { BankInfo } from '../../models/deposit.model';
import LongButton from '../../components/RoomDetail/LongButton';
import { getDepositDetail, putDeposit } from '../../api/deposit.api';
import { useNavigate, useParams } from 'react-router-dom';
import { getClosestFutureDate } from '../../utils/getCloseDate';
import ToggleSwitch from '../../components/Room/ToggleSwitch';

const CreatePayment = () => {
  const params = new URLSearchParams(location.search);
  const isEdit = params.get('isEdit');

  // depositInfo ? getClosestFutureDate(depositInfo.depositAt) : ''

  const [depositDay, setDepositday] = useState('');
  const [depositAmount, setdepositAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState<BankInfo>();
  const [isChecked, setIsChecked] = useState(false);
  const { roomId } = useParams<{ roomId: string }>();
  const nav = useNavigate();

  useEffect(() => {
    console.log('실행');
    if (isEdit) {
      getDepositDetail(roomId!).then((data) => {
        setBank(data.data);
        setDepositday(getClosestFutureDate(data.data.depositAt));
        setdepositAmount(data.data.depositAmount);
        setAccountNumber(data.data.accountNumber);
      });
    }
  }, []);

  const handleSumbit = () => {
    const payload = {
      bankId: bank?.bankId!,
      accountNumber: accountNumber,
      depositAmount: Number(depositAmount),
      depositAt: Number(depositDay.slice(8)),
    };
    putDeposit(roomId!, payload).then((data) => {
      nav(`/user/${roomId}/payment`, { state: { toast: true, isEdit: isEdit } });
    });
  };

  return (
    <div className="px-4 flex flex-col h-full relative">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">
          어떤 계좌로 언제 입금할까요?
        </p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">
          입금일 정보를 생성하고 놓치지 마세요!
        </p>
      </div>
      {/* 입금날짜 */}
      <div className="flex flex-col gap-[6px] py-4">
        {/* 날짜 고르기 */}
        <PickDate
          deadline={depositDay}
          setDeadline={setDepositday}
          isAble={true}
          text="매달 입금될 날짜를 선택해주세요."
          onlyDate={true}
          name="매월 입금일"
        />
      </div>
      {/* 은행 및 금액 */}
      {depositDay && (
        <div className="py-4 flex flex-col gap-6">
          {/* 은행 */}
          <div className="flex gap-4 flex-col">
            <Input
              placeholder="계좌번호를 입력해주세요"
              desc={accountNumber}
              setDesc={setAccountNumber}
              isAble={true}
            />
            <div className="flex flex-col gap-[6px]">
              <ChooseBank setBank={setBank} bank={bank} />
              <p className="text-body4 leading-[25px] text-gray-400">
                계좌번호를 입력하면 은행을 찾아드릴게요.
              </p>
            </div>
          </div>
          {/* 금액 */}
          <Input
            placeholder="입금될 금액을 입력하세요"
            setDesc={setdepositAmount}
            desc={depositAmount}
            isAble={true}
            name="입금 금액"
          />
          {/* 카카오톡 알림 설정 */}
          {bank && accountNumber !== '' && depositDay !== '' && depositAmount !== '' && (
            <div className="py-4 flex flex-col ">
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

              <div className="py-6 mt-auto absolute bottom-0 right-4 left-4">
                <LongButton
                  onClick={handleSumbit}
                  text={isEdit ? '수정하기' : '완료'}
                  enable={true}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatePayment;
