import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';

type DateProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateHandler = ({ date, setDate }: DateProps) => {
  const handleLeft = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleRight = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className="flex pt-2 justify-center items-center gap-1">
      <button className="p-2" onClick={handleLeft}>
        <MdKeyboardArrowLeft size={24} />
      </button>
      <div className="px-2 text-xl font-medium text-gray-900">
        {date.getFullYear()}.{date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}
      </div>
      <button className="p-2" onClick={handleRight}>
        <MdKeyboardArrowRight size={24} />
      </button>
    </div>
  );
};

export default DateHandler;
