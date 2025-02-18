import { useEffect, useState } from 'react';
import SubjectTag from '../../components/SubjectTag';
import Chart from '../../components/Chart';
import StatisticsButton from '../../components/StatisticsButton';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal/Modal';
import CreateModal from '../../components/Modal/CreateModal';
import Loading from '../Loading';
import NoStatsData from '../../components/NoStatsData';

export interface DataType {
  name: string;
  grade: number;
}

const Statistics = () => {
  const nav = useNavigate();
  // const [tags, setTags] = useState([{ id: 0, title: '전체', isClicked: true }]);
  const [tags, setTags] = useState([
    { id: 0, title: '국어', isClicked: true },
    { id: 1, title: '수학', isClicked: false },
    { id: 2, title: '영어', isClicked: false },
  ]);
  const userRole = localStorage.getItem('roleInfo');
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<DataType[]>();

  useEffect(() => {
    // 예제 데이터 로드 (실제로는 API 요청을 넣을 수 있음)
    setTimeout(() => {
      setData([
        // { name: 'Page A', grade: 50 },
        // { name: 'Page B', grade: 60 },
        // { name: 'Page C', grade: 60 },
        // { name: 'Page D', grade: 90 },
        // { name: 'Page E', grade: 80 },
        // { name: 'Page F', grade: 100 },
      ]);
    }, 1000);
  }, []);

  const onClickTag = (id: number, title: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        isClicked: tag.id === id,
      })),
    );
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
          {tags.map((tag) => (
            <SubjectTag key={tag.id} tag={tag} onClick={onClickTag} isNoSharp={true} />
          ))}
        </div>
      </div>
      {/* 그래프 */}
      <div className="flex flex-col pt-4 pb-6 rounded-lg bg-gray-50 w-full justify-center items-center px-4 gap-6">
        <h1 className="text-body2 font-semibold leading-8 tracking-[-0.18px]">시험 종류명</h1>
        <div className="w-full h-full">
          <Chart data={data} />
        </div>
        {userRole == 'TEACHER' ? <StatisticsButton onClick={() => nav('create')} /> : ''}
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
