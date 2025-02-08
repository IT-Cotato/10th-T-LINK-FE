import { useState } from 'react';
import Calendar from '../assets/images/calendarGray.svg?react';
import Search from '../assets/images/Search.svg?react';
import './SearchBar.css';
import Modal from './Modal/Modal';
import DatePicker from './DatePicker';

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchBar = ({ value, setValue }: SearchBarProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg gap-2">
      <input
        type="text"
        className="border w-full bg-transparent text-body3 font-normal border-none leading-7 focus:outline-none"
        placeholder="업로드 날짜 선택 또는 키워드 검색"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Calendar onClick={() => setShowDatePicker(true)} className="cursor-pointer" />

      {showDatePicker && (
        <Modal onClose={() => setShowDatePicker(false)}>
          <DatePicker setValue={setValue} onClose={() => setShowDatePicker(false)} />
        </Modal>
      )}

      <Search />
    </div>
  );
};

export default SearchBar;
