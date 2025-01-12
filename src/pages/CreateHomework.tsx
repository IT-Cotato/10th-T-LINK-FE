import { ChangeEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateHomework = () => {
  const [fileNames, setFileNames] = useState<string[]>([]); // 파일 이름 목록
  const [isActive, setIsActive] = useState<boolean>(false); // 드래그 활성화 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDragStart = () => setIsActive(true);
  const handleDragEnd = () => setIsActive(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const names = Array.from(files).map((file) => file.name);
      setFileNames(names);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsActive(false);
    const files = event.dataTransfer.files;
    const names = Array.from(files).map((file) => file.name);
    setFileNames(names);
  };

  return (
    <div className="px-4">
      <div className="flex w-full">
        <DatePicker
          className="react-datepicker"
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect
          minDate={new Date()}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </div>
      <div
        className={`border-2 py-10 flex items-center justify-center cursor-pointer ${
          isActive ? 'border-primary_500 bg-primary_50' : 'border-gray-400'
        }`}
      >
        <label
          onDragEnter={handleDragStart}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-full flex items-center justify-center"
        >
          <input type="file" className="hidden" multiple onChange={handleFileChange} />
          <p>클릭 혹은 파일을 이곳에 드롭하세요.</p>
        </label>
      </div>
      {fileNames.length > 0 && (
        <div className="mt-4 text-center text-gray-700">
          <p>업로드된 파일 목록:</p>
          <ul>
            {fileNames.map((fileName, index) => (
              <li key={index} className="font-bold">
                {fileName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateHomework;
