import Calendar from '../../assets/images/calendarGray.svg?react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Modal from '../Modal/Modal';
import DatePicker from '../DatePicker';
import { useState } from 'react';

interface PickDateProps {
  deadline: string;
  setDeadline: (value: string) => void;
  isAble: boolean;
  text: string;
}

const PickDate = ({ deadline, setDeadline, isAble, text }: PickDateProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleClick = () => {
    if (isAble) {
      setShowDatePicker(true);
    }
  };

  return (
    <div>
      <div className="mt-4 flex items-center bg-gray-100 p-2 rounded-lg gap-2" onClick={handleClick}>
        <Calendar onClick={() => setShowDatePicker(true)} className="cursor-pointer" />
        <input
          className="text-gray-400 text-body3 leading-7 tracking-[-0.048px] flex-1 bg-transparent pointer-events-none"
          value={deadline}
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
  );
};

export default PickDate;
