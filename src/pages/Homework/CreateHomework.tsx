import { ChangeEvent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { uploadHomework } from '../../api/homework.api';
import AddIcon from '../../assets/images/File_dock_add.svg?react';
import LongButton from '../../components/LongButton';
import Calendar from '../../assets/images/calendarGray.svg?react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import DatePicker from '../../components/DatePicker';
import Modal from '../../components/Modal/Modal';

const CreateHomework = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [fileList, setFileList] = useState<File[]>([]); // 파일 이름 목록
  const [isActive, setIsActive] = useState<boolean>(false); // 드래그 활성화 상태
  const [deadline, setDeadline] = useState<string>(''); // 선택된 숙제 마감 날짜
  const [desc, setDesc] = useState<string>(''); // 숙제 설명
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDragStart = () => setIsActive(true);
  const handleDragEnd = () => setIsActive(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFileList([...fileList, ...fileArray]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsActive(false);
    const fileList = event.dataTransfer.files;
    const fileArray = Array.from(fileList);
    setFileList([...fileList, ...fileArray]);
  };

  const handleDesc = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  const handleDeleteFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    if (!deadline) {
      alert('마감 날짜를 선택해주세요');
      return false;
    }

    if (!desc.trim()) {
      alert('숙제 설명을 입력해주세요');
      return false;
    }

    return true;
  };

  // 숙제 업로드
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      homeworkName: desc,
      deadline: deadline,
      homeworkFiles: fileList,
    };

    try {
      const data = await uploadHomework(roomId!, payload);
      console.log('숙제 업로드 성공:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 flex flex-col h-full">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">업로드 숙제의 정보를 입력하세요.</p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">언제든지 수정할 수 있어요!</p>
      </div>
      <div className="mt-4 flex items-center bg-gray-100 p-2 rounded-lg gap-2" onClick={() => setShowDatePicker(true)}>
        <Calendar onClick={() => setShowDatePicker(true)} className="cursor-pointer" />
        <input
          className="text-gray-400 text-body3 leading-7 tracking-[-0.048px] flex-1 bg-transparent"
          value={deadline}
          placeholder="숙제의 마감 날짜를 선택해주세요."
        ></input>
        <MdKeyboardArrowRight size={24} fill="#6A6966" />
      </div>
      {showDatePicker && (
        <Modal>
          <DatePicker setValue={setDeadline} onClose={() => setShowDatePicker(false)} />
        </Modal>
      )}
      {/* 파일첨부 */}
      <div className="py-4 gap-6 flex flex-col">
        <div className="flex flex-col gap-[6px]">
          <p className="text-gray-900 font-medium text-body4 leading-[26px]">숙제명</p>
          <input
            placeholder="숙제명을 입력해주세요"
            className="py-2 px-3 border-gray-300 border-[1px] focus:outline-none focus:outline-2 focus:outline-gray-500 rounded-md text-body3"
            onChange={handleDesc}
          ></input>
        </div>
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
      </div>
      {fileList.length > 0 && (
        <div className="mt-4 text-center text-gray-700">
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
      <div className="py-6 mt-auto">
        <LongButton
          enable={!!(fileList.length > 0 && desc.length > 0 && deadline.length > 0)}
          onClick={handleSubmit}
          text="업로드 하기"
        />
      </div>
    </div>
  );
};

export default CreateHomework;
