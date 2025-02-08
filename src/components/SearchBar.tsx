import { useState } from 'react';
import Calendar from '../assets/images/calendarGray.svg?react';
import Search from '../assets/images/Search.svg?react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css';
import { formatDate } from '../utils/formatDate';

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchBar = ({ value, setValue }: SearchBarProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      setValue(formatDate(date));
    }
    setTimeout(() => {
      setShowDatePicker(false);
    }, 100);
  };

  const chooseDate = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg gap-2">
      <input
        type="text"
        className="border w-full bg-transparent text-body3 font-normal border-none leading-7 focus:outline-none"
        placeholder="업로드 날짜 선택 또는 키워드 검색"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Calendar onClick={chooseDate} className="cursor-pointer" />

      {showDatePicker && (
        <div className="absolute top-32 right-4">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            popperClassName="custom-datepicker"
            inline
            highlightDates={[]}
          />
        </div>
      )}

      <Search />
    </div>
  );
};

export default SearchBar;
