import { useEffect, useState } from 'react';
import PickDate from '../../components/RoomDetail/PickDate';
import Input from '../../components/RoomDetail/Input';
import ChooseBank from '../../components/Deposit/ChooseBank';
import { BankInfo } from '../../models/deposit.model';
import LongButton from '../../components/Common/LongButton';
import { getDepositDetail, putDeposit } from '../../api/deposit.api';
import { useNavigate, useParams } from 'react-router-dom';
import { getClosestFutureDate } from '../../utils/getCloseDate';
import CreateDesc from '../../components/RoomDetail/CreateDesc';
import DepositAlarm from '../../components/Deposit/DepositAlarm';

const CreatePayment = () => {
  const params = new URLSearchParams(location.search);
  const isEdit = params.get('isEdit');

  const [depositDay, setDepositday] = useState('');
  const [depositAmount, setdepositAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState<BankInfo>();
  const { roomId } = useParams<{ roomId: string }>();
  const nav = useNavigate();

  const isFormComplete = bank && accountNumber !== '' && depositDay !== '' && depositAmount !== '';

  useEffect(() => {
    if (isEdit) {
      fetchDepositDetails();
    }
  }, []);

  // 입금일 데이터 받아오기
  const fetchDepositDetails = async () => {
    const data = await getDepositDetail(roomId!);
    setBank(data.data);
    setDepositday(getClosestFutureDate(data.data.depositAt));
    setdepositAmount(data.data.depositAmount);
    setAccountNumber(data.data.accountNumber);
  };

  // 입금일 등록
  const handleSumbit = async () => {
    const payload = {
      bankId: bank?.bankId!,
      accountNumber: accountNumber,
      depositAmount: Number(depositAmount),
      depositAt: Number(depositDay.slice(8)),
    };
    await putDeposit(roomId!, payload);
    nav(`/user/${roomId}/payment`, { state: { toast: true, isEdit } });
  };

  return (
    <div className="px-4 flex flex-col h-full relative">
      {/* 설명 */}
      <CreateDesc
        title="어떤 계좌로 언제 입금할까요?"
        desc="입금일 정보를 생성하고 놓치지 마세요!"
      />
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
          {isFormComplete && (
            <div className="py-4 flex flex-col ">
              <DepositAlarm />
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
