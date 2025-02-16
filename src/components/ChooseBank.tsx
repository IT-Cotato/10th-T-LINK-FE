import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import BottomSheet from './BottomSheet';
import Modal from './Modal/Modal';
import { BankInfo } from '../models/deposit.model';

interface ChooseBankProps {
  setBank: (value: BankInfo) => void;
  bank: BankInfo | undefined;
}

const ChooseBank = ({ setBank, bank }: ChooseBankProps) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <>
      <div
        className="py-2 px-3 border-gray-300 border-[1px] rounded-md text-body3 flex justify-between items-center h-full"
        onClick={() => setBottomSheetOpen(true)}
      >
        {bank ? (
          <p className="text-gray-900 leading-7-">{bank.bankName}</p>
        ) : (
          <p className="text-gray-400 leading-7-">은행 선택</p>
        )}

        <FaAngleDown fill="#C6C4C1" />
      </div>
      {bottomSheetOpen && (
        <Modal onClose={() => setBottomSheetOpen(false)}>
          <BottomSheet setBottomSheetOpen={setBottomSheetOpen} setBank={setBank} />
        </Modal>
      )}
    </>
  );
};

export default ChooseBank;
