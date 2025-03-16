import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLectureFileDeatil, patchLectureFile } from '../../api/materials.api';
import { LectureFile } from '../../models/materials.model';
import Input from '../../components/RoomDetail/Input';
import LongButton from '../../components/Common/LongButton';
import Loading from '../Common/Loading';
import Container from '../../components/Common/Container';
import FileList from '../../components/Material/FileList';

const EditMaterial = () => {
  const { roomId, materialId } = useParams<{ roomId: string; materialId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [fileList, setFileList] = useState<LectureFile[]>([]); // 기존 파일 목록
  const [desc, setDesc] = useState<string>(''); // 강의 자료 설명
  const [addList, setAddList] = useState<File[]>([]);
  const [removeList, setRemoveList] = useState<number[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    getMaterialDetail();
  }, [roomId, materialId]);

  // 수정을 위한 상세 조회
  const getMaterialDetail = async () => {
    setLoading(true);
    const response = await getLectureFileDeatil(roomId!, materialId!);
    setFileList(response.data.lectureFiles);
    setDesc(response.data.lectureFileBoxName);
    setLoading(false);
  };

  // 기존 파일 삭제
  const handleFileDelete = (file: LectureFile, index: number) => {
    removeList.push(file.lectureFileId!);
    console.log(removeList);
    setFileList(fileList.filter((_, i) => i !== index));
  };

  //  수정
  const handleSubmit = async () => {
    const payload = {
      lectureFileBoxName: desc,
      addLectureFiles: addList,
      removeLectureFiles: removeList,
    };

    await patchLectureFile(roomId!, materialId!, payload);
    nav(-1);
  };

  if (loading) {
    return <Loading text="데이터 로딩 중..." />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-6 py-4">
        <Input
          setDesc={setDesc}
          desc={desc}
          name="자료명"
          placeholder="자료명을 입력해주세요"
          isAble={true}
        />
        {fileList.length > 0 && (
          <FileList files={fileList} onDelete={handleFileDelete} type={false} />
        )}
      </div>
      {/* 버튼 */}
      <div className="py-6 mt-auto">
        <LongButton enable={!!(desc.length > 0)} onClick={handleSubmit} text="수정 완료" />{' '}
      </div>
    </Container>
  );
};

export default EditMaterial;
