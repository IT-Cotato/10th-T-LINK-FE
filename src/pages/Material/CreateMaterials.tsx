import { ChangeEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import instance from '../../api/axios';
import { useParams } from 'react-router-dom';

const CreateMaterials = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [fileList, setFileList] = useState<File[]>([]); // 파일 이름 목록
  const [isActive, setIsActive] = useState<boolean>(false); // 드래그 활성화 상태
  const [desc, setDesc] = useState<string>(''); // 강의 자료 설명

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

  const handleDesc = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(event.target.value);
  };

  const handleDeleteFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    if (!desc.trim()) {
      alert('강의자료 설명을 입력해주세요');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('lectureFiles', file);
    });

    formData.append('lectureFileName', desc);

    // 확인용 출력
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // api 호출
    try {
      const response = await instance.post(`/api/v1/rooms/${roomId}/lectureFileBoxes`, formData);

      if (response.status === 201) {
        console.log('강의자료 업로드 성공');
      }
    } catch (error) {
      console.log('강의 자료 업로드 실패', error);
    }
  };

  return (
    <div className="px-4">
      <div>
        <textarea
          className="p-2 w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="강의 자료에 대해 설명 해주세요"
          onChange={handleDesc}
        ></textarea>
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
          className="w-full flex items-center justify-center"
        >
          <input type="file" className="hidden" multiple onChange={handleFileChange} />
          <p>클릭 혹은 파일을 이곳에 드롭하세요.</p>
        </label>
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
      <button onClick={handleSubmit} className="border bg-slate-200">
        업로드
      </button>
    </div>
  );
};

export default CreateMaterials;
