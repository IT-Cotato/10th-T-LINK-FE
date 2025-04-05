import { useEffect, useState } from 'react';
import { getBankList } from '../../api/deposit.api';
import Bank from './Bank';
import { BankInfo } from '../../models/deposit.model';
import Loading from '../../pages/Common/Loading';

interface BottomSheetProps {
  setBottomSheetOpen: (value: boolean) => void;
  setBank: (value: BankInfo) => void;
}

const BottomSheet = ({ setBottomSheetOpen, setBank }: BottomSheetProps) => {
  const [bankList, setBankList] = useState<BankInfo[]>([]);

  const getBanks = () => {
    getBankList().then((res) => {
      setBankList(res.banks);
    });
  };

  useEffect(() => {
    getBanks();
  }, []);

  const handleBank = (bank: BankInfo) => {
    setBank(bank);
    setBottomSheetOpen(false);
  };

  if (!bankList) {
    return <Loading text="은행 정보를 불러오는 데 실패하였습니다!" />;
  }

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 z-20 mx-auto flex max-w-[500px] flex-col 
          rounded-t-lg bg-white shadow-[0_-6px_10px_-5px_rgba(0,0,0,0.6)] 
          transition-transform duration-500 ease-out translate-y-full
          animate-slide-up`}
    >
      {/* 드래그 핸들 */}
      <div className="h-6 relative pt-3 pb-1 rounded-t-lg rounded-br-lg">
        <div className="w-10 h-1 rounded bg-gray-300 mx-auto"></div>
      </div>

      {/* 내용 */}
      <div className="overflow-auto overscroll-contain scrollbar-hide h-[calc(100vh-10rem)] px-4 py-6">
        <div className="grid grid-cols-3 gap-2">
          {bankList.map((bank) => (
            <Bank
              key={bank.bankId}
              bankName={bank.bankName}
              bankUrl={bank.bankUrl}
              onClick={() => handleBank(bank)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
