interface GenderProps {
  gender: {
    id: number;
    type: string;
    isClicked: boolean;
  };
  handleClick: (type: string) => void;
}

const GenderButton = ({ gender, handleClick }: GenderProps) => {
  return (
    <button
      key={gender.id}
      className={`flex justify-center items-center px-4 py-2.5 font-semibold rounded-3xl border-2 ${gender.isClicked ? 'bg-white  text-primary_600 border-primary_600' : 'bg-gray-100 text-gray-500 border-gray-100'}`}
      onClick={() => handleClick(gender.type)}
    >
      {gender.type}
    </button>
  );
};

export default GenderButton;
