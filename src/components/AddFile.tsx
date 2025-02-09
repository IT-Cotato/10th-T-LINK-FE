import { ChangeEvent, useState } from 'react';
import AddIcon from '../assets/images/File_dock_add.svg?react';

interface AddFileProps {
  setFileList: (value: File[]) => void;
  fileList: File[];
}

const AddFile = ({ setFileList, fileList }: AddFileProps) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 드래그 활성화 상태

  const handleDragStart = () => setIsActive(true);
  const handleDragEnd = () => setIsActive(false);

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsActive(false);
    const fileList = event.dataTransfer.files;
    const fileArray = Array.from(fileList);
    setFileList([...fileList, ...fileArray]);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFileList([...fileList, ...fileArray]);
    }
  };

  const handleDeleteFile = (index: number) => {
    setFileList(fileList.filter((_, i) => i !== index)); // 값으로 바로 전달
  };

  return (
    <>
      <div
        className={`border-[1px] h-[200px] border-dashed rounded-lg py-10 flex flex-col items-center justify-center cursor-pointer ${
          isActive ? 'border-primary_500 bg-primary_50' : 'border-[#D4D4D8] bg-[#FAFAFA]'
        }`}
      >
        <label
          onDragEnter={handleDragStart}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full flex items-center justify-center"
        >
          <input type="file" className="hidden" multiple onChange={handleFileChange} />
          <div className="justify-center items-center flex flex-col gap-1">
            <AddIcon className="p-2 w-12 h-12 bg-gray-100 rounded-full" />
            <p className="text-gray-500 text-[12px] leading-[22px]">파일 첨부하기</p>
          </div>
        </label>
      </div>
      {fileList.length > 0 && (
        <div className="text-center text-gray-700">
          <p>업로드된 파일 목록:</p>
          <ul>
            {fileList.map((file, index) => (
              <li key={index} className="font-bold">
                {file.name}
                <button onClick={() => handleDeleteFile(index)} className="text-red-500 hover:underline ml-4">
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AddFile;
