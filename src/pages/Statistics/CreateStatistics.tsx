import SubjectTag from '../../components/SubjectTag';
import Table from '../../components/Table';
import { useLocation } from 'react-router-dom';
import { Type } from './Statistics';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import RoomDeleteModal from '../../components/Modal/RoomDeleteModal';

const CreateStatistics = () => {
  const location = useLocation();
  const { tags, id } = (location.state as { tags: Type[]; id: number }) ?? { tags: [], id: 1 };

  const [tag, setTag] = useState<Type[]>(tags);
  const [selectedTag, setSelectedTag] = useState<number>(id);
  const [modalOpen, setModalOpen] = useState(false);

  const onClickTag = (id: number, title: string) => {
    setTag((prevTags: Type[]) => prevTags.map((tag) => ({ ...tag, isClicked: tag.id === id })));
    setSelectedTag(id);
  };

  return (
    <div className="flex flex-col px-4">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">성적을 추가해보세요.</p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">
          시험 성적을 추가하고 그래프를 확인해보세요!
        </p>
      </div>
      {/* 시험 종류 */}
      <div className="py-4 flex flex-col gap-[6px]">
        <p className="text-body4 font-medium leading-[26px] tracking-[-0.042px] ">시험 종류</p>
        <div className="flex gap-2">
          {tag && tag.map((tag) => <SubjectTag key={tag.id} tag={tag} onClick={onClickTag} />)}
        </div>
      </div>
      {/* 그래프 */}
      <div className="py-4">
        <Table selectedId={selectedTag} />
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <RoomDeleteModal setModalOpen={setModalOpen} what={'통계'} />
        </Modal>
      )}
    </div>
  );
};

export default CreateStatistics;
