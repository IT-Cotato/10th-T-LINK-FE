import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLectureFileDeatil, patchLectureFile } from '../../api/materials.api';
import { LectureFile } from '../../models/materials.model';
import Input from '../../components/RoomDetail/Input';
import AddFile from '../../components/Material/AddFile';
import LongButton from '../../components/RoomDetail/LongButton';
import Loading from '../Common/Loading';
import FileDetail from '../../components/Material/FileDetail';

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

  const getMaterialDetail = async () => {
    setLoading(true);
    try {
      const response = await getLectureFileDeatil(roomId!, materialId!);
      if (response.status == 200) {
        setFileList(response.data.lectureFiles);
        setDesc(response.data.lectureFileBoxName);
      }
    } catch (error) {
      console.log('강의 자료 페이지를 불러오는데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  // 기존 파일 삭제
  const handleFileDelete = (file: LectureFile, index: number) => {
    removeList.push(file.lectureFileId!);
    console.log(removeList);
    setFileList(fileList.filter((_, i) => i !== index));
  };

  //  수정
  const handleSubmit = async () => {
    const payload = { lectureFileBoxName: desc, addLectureFiles: addList, removeLectureFiles: removeList };

    try {
      const data = await patchLectureFile(roomId!, materialId!, payload);
      console.log('숙제 업로드 성공:', data);
      nav(-1);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loading text="데이터 로딩 중..." />;
  }

  return (
    <div className="px-4 flex flex-col h-full pt-4 gap-6">
      <Input setDesc={setDesc} desc={desc} name="자료명" placeholder="자료명을 입력해주세요" isAble={true} />
      <div>
        {fileList.length > 0 && (
          <div className="text-center text-gray-700 gap-2 flex flex-col">
            {fileList.map((file, index) => (
              <FileDetail
                key={file.lectureFileId}
                title={file.originalName}
                onDelete={() => handleFileDelete(file, index)}
              />
            ))}
          </div>
        )}
      </div>
      <AddFile setFileList={setAddList} fileList={addList} />
      {/* 버튼 */}
      <div className="py-6 mt-auto">
        <LongButton enable={!!(desc.length > 0)} onClick={handleSubmit} text="수정 완료" />
      </div>
    </div>
  );
};

export default EditMaterial;
