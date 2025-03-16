import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadLectureFile } from '../../api/materials.api';
import LongButton from '../../components/Common/LongButton';
import AddFile from '../../components/Material/AddFile';
import Input from '../../components/RoomDetail/Input';
import Container from '../../components/Common/Container';
import CreateDesc from '../../components/RoomDetail/CreateDesc';

const CreateMaterials = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [fileList, setFileList] = useState<File[]>([]); // 파일 이름 목록
  const [desc, setDesc] = useState<string>(''); // 강의 자료 설명
  const nav = useNavigate();

  // 강의 자료 설명 있는지 확인
  const validateForm = (): boolean => {
    if (!desc.trim()) {
      alert('강의자료 설명을 입력해주세요');
      return false;
    }

    return true;
  };

  // 업로드 하기
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      lectureFileBoxName: desc,
      lectureFiles: fileList,
    };

    // 숙제 업로드
    await uploadLectureFile(roomId!, payload);
    nav(-1);
  };

  return (
    <Container>
      {/* 설명 */}
      <CreateDesc title="업로드 할 자료의 정보를 입력하세요." desc="언제든지 수정할 수 있어요!" />
      {/* 파일첨부 */}
      <div className="py-4 gap-6 flex flex-col">
        <Input
          setDesc={setDesc}
          name="자료명"
          placeholder="자료명을 입력해주세요"
          desc={desc}
          isAble={true}
        />
        <AddFile fileList={fileList} setFileList={setFileList} />
      </div>
      <div className="py-6 mt-auto">
        <LongButton
          enable={!!(fileList.length > 0 && desc.length > 0)}
          onClick={handleSubmit}
          text="업로드 하기"
        />
      </div>
    </Container>
  );
};

export default CreateMaterials;
