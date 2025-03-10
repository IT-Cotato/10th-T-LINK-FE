import Calendar from '../../assets/images/calendarGray.svg?react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Modal from '../Modal/Modal';
import DatePicker from './DatePicker';
import { useState } from 'react';

interface PickDateProps {
  deadline: string;
  setDeadline: (value: string) => void;
  isAble: boolean;
  text: string;
  onlyDate?: boolean;
  name: string;
}

const PickDate = ({ deadline, setDeadline, isAble, text, onlyDate, name }: PickDateProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleClick = () => {
    if (isAble) {
      setShowDatePicker(true);
    }
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="text-body4 leading-[26px] font-medium flex gap-1">
        <span className="text-gray-900">{name}</span>
        <span className="text-primary_700">(필수)</span>
      </div>
      {/* 날짜 고르기 */}
      <div>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg gap-2" onClick={handleClick}>
          <Calendar onClick={handleClick} className="cursor-pointer" />
          <input
            className="text-gray-400 text-body3 leading-7 tracking-[-0.048px] flex-1 bg-transparent pointer-events-none"
            value={onlyDate ? deadline.slice(8) : deadline}
            placeholder={text}
          ></input>
          <MdKeyboardArrowRight size={24} fill="#6A6966" />
        </div>
        {showDatePicker && (
          <Modal onClose={() => setShowDatePicker(false)}>
            <DatePicker setValue={setDeadline} onClose={() => setShowDatePicker(false)} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PickDate;
