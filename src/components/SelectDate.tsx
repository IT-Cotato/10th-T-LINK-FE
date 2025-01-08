import { Day } from '../pages/CreateRoom';

type DayProps = {
  day: Day;
  handleClick: (id: number) => void;
};

const SelectDate = ({ day, handleClick }: DayProps) => {
  return (
    <div>
      <button
        className={`px-4 text-white  ${day.isClicked ? 'bg-gray-300' : 'bg-black'}`}
        onClick={() => handleClick(day.id)}
      >
        {day.date}
      </button>
    </div>
  );
};
export default SelectDate;
