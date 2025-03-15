import { IoSearch } from 'react-icons/io5';

interface SearchProps {
  value: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChangeSearch }: SearchProps) => {
  return (
    <div className="p-4 flex w-full">
      <div className="flex w-full p-2 gap-2 items-center bg-gray-100 rounded-lg">
        <input
          className="flex-1 bg-gray-100 font-normal leading-7"
          placeholder="이름 또는 키워드 검색"
          onChange={onChangeSearch}
          value={value}
        />
        <IoSearch size={24} color="#6A6966" />
      </div>
    </div>
  );
};

export default Search;
