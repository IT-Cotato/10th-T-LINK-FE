import { useEffect, useState } from 'react';
import SubjectTag from '../../components/SubjectTag';
import Chart from '../../components/Chart';
import StatisticsButton from '../../components/StatisticsButton';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal/Modal';
import CreateModal from '../../components/Modal/CreateModal';
import Loading from '../Loading';
import { getExamType, getGrade } from '../../api/statistics.api';
import Empty from '../../components/Statistics/Empty';

export interface DataType {
  examName: string;
  grade: number;
}

export interface Type {
  id: number;
  title: string;
  isClicked: boolean;
}

interface Subject {
  id: number;
  name: string;
}

const Statistics = () => {
  const nav = useNavigate();
  const [tags, setTags] = useState<Type[]>([]);
  const userRole = localStorage.getItem('roleInfo');
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const { roomId } = useParams<{ roomId: string }>();
  const [name, setName] = useState('');
  const [selectedTag, setSelectedTag] = useState<number>();

  useEffect(() => {
    // 시험 종류 받아오기
    getExamType(roomId!).then((data) => {
      if (data.data.examBox.length !== 0) {
        setTags(
          data.data.examBox.map((subject: Subject, index: number) => ({
            id: subject.id,
            title: subject.name,
            isClicked: index == 0 ? true : false,
          })),
        );
        getExamGrade(data.data.examBox[0].id);
        setSelectedTag(data.data.examBox[0].id);
        setName(data.data.examBox[0].name);
      }
    });
  }, [modalOpen]);

  // 성적 조회
  const getExamGrade = (id: number) => {
    getGrade(roomId!, id.toString()).then((data) => {
      if (data.data.exams.length == 0) {
        setData([]);
      } else {
        setData(data.data.exams);
      }
    });
  };

  // tags가 비어있는 경우, 버튼만 렌더링
  if (tags?.length == 0 || !tags) {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <Empty />
      </div>
    );
  }

  const onClickTag = (id: number, title: string) => {
    setTags((prevTags = []) => prevTags.map((tag) => ({ ...tag, isClicked: tag.id === id })));

    getExamGrade(id);
    setSelectedTag(id);
    setName(title);
  };

  if (!data) {
    return <Loading text="데이터를 불러오는 중..." />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* 시험 종류 */}
      <div className="py-4 flex flex-col gap-[6px] px-4">
        <p className="text-body4 font-medium leading-[26px] tracking-[-0.042px] ">시험 종류</p>
        <div className="flex gap-2">
          {tags && tags.map((tag) => <SubjectTag key={tag.id} tag={tag} onClick={onClickTag} isNoSharp={true} />)}
        </div>
      </div>
      {/* 그래프 */}
      <div className="flex flex-col pt-4 pb-6 rounded-lg bg-gray-50 w-full justify-center items-center px-4 gap-6">
        <h1 className="text-body2 font-semibold leading-8 tracking-[-0.18px]">{name}</h1>
        <div className="w-full h-full">
          <Chart data={data} />
        </div>
        {userRole == 'TEACHER' ? (
          <StatisticsButton
            type="성적"
            onClick={() => nav('create', { state: { tags: tags ?? [], id: selectedTag } })}
          />
        ) : (
          ''
        )}
      </div>
      {userRole == 'TEACHER' ? <Button text="시험 추가하기" onClick={() => setModalOpen(true)} /> : ''}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <CreateModal type="시험" setModalOpen={setModalOpen} />
        </Modal>
      )}
    </div>
  );
};

export default Statistics;
