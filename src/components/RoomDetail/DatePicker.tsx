import { useState } from 'react';
import CalendarGrid from '../Calendar/CalendarGrid';
import DateHandler from '../Calendar/DateHandler';
import { Clicked } from '../../models/calendar.model';
import { formatDate } from '../../utils/formatDate';

interface DatePickerProps {
  setValue: (value: string) => void;
  onClose: () => void;
}

const DatePicker = ({ setValue, onClose }: DatePickerProps) => {
  const [date, setDate] = useState(new Date());
  const [clickDate, setClickDate] = useState<Clicked>({
    date: date,
    month: date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    day: date.getDate(),
    roomname: false,
    subjectAndRooms: false,
  });

  const handleDayClick = (day: Date | null) => {
    if (!day) return;

    setClickDate({
      date: day,
      month: day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1,
      day: day.getDate() < 10 ? '0' + day.getDate() : day.getDate(),
      roomname: false,
      subjectAndRooms: false,
    });
  };

  const handleSetDate = () => {
    setValue(formatDate(clickDate.date));
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl w-[90%] h-[58%] px-4 flex-col justify-between flex pb-4">
      <div>
        <DateHandler date={date} setDate={setDate} />
      </div>
      <div className="flex-1">
        <CalendarGrid date={date} data={[]} handleDayClick={handleDayClick} clickDate={clickDate} />
      </div>
      <div className="flex mt-auto justify-end gap-2">
        <p className="px-3 py-[10px] text-gray-900 leading-[25px] tracking-[-0.042px]" onClick={onClose}>
          취소
        </p>
        <p className="px-3 py-[10px] text-primary_700 leading-[25px] tracking-[-0.042px]" onClick={handleSetDate}>
          설정하기
        </p>
      </div>
    </div>
  );
};

export default DatePicker;
