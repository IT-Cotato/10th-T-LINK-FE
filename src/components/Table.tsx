import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { IoMdAdd } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import RoomDeleteModal from './Modal/RoomDeleteModal';
import Modal from './Modal/Modal';
import CreateModal from './Modal/CreateModal';
import { getGrade } from '../api/statistics.api';
import { useParams } from 'react-router-dom';

type Grade = { round: number; title: string; grade: number; icon: React.ElementType };

const defaultData: Grade[] = [];

const columnHelper = createColumnHelper<Grade>();

const columns = [
  columnHelper.accessor('round', { cell: (info) => info.getValue(), header: () => <span>회차</span> }),
  columnHelper.accessor((row) => row.title, {
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => <span>시험 이름</span>,
  }),
  columnHelper.accessor('grade', { cell: (info) => info.renderValue(), header: () => <span>점수</span> }),
  columnHelper.accessor('icon', {
    header: () => <IoMdAdd className="w-full stroke-[6px] h-5" />,
    cell: (info) => {
      const Icon = info.getValue(); // 저장된 React.ElementType을 가져옴
      return <Icon className="h-5 cursor-pointer w-full" />;
    },
  }),
];

interface TableProps {
  selectedId: number;
}

const Table = ({ selectedId }: TableProps) => {
  const [data, setData] = useState(() => [...defaultData]);
  const [modalOpen, setModalOpen] = useState(false); // 삭제 모달
  const [createModalOpen, setCreateModalOpen] = useState(false); // 삭제 모달
  const { roomId } = useParams<{ roomId: string }>();
  const [list, setList] = useState();
  const [item, setItem] = useState({
    examId: 0,
    examName: '',
    grade: 0,
  });
  const [examId, setExamId] = useState(0);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  useEffect(() => {
    getGrade(roomId!, selectedId.toString()).then((data) => {
      const transformedData = data.data.exams.map((item: { examName: string; grade: number }, index: number) => ({
        round: index + 1,
        title: item.examName,
        grade: item.grade,
        icon: FiTrash2,
      }));
      setList(data.data.exams);
      setData(transformedData);
    });
  }, [createModalOpen, modalOpen, selectedId]);

  const handleDelete = (id: string) => {
    const match = id.match(/^\d+/); // 숫자 부분 추출
    const idx = match ? parseInt(match[0], 10) : null;

    if (list && idx !== null) {
      setItem(list[idx]);
    }

    if (id.includes('icon')) {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (item) setExamId(item.examId);
  }, [item]);

  const handleCreate = (id: string) => {
    if (id == 'icon') {
      setCreateModalOpen(true);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border-2 border-gray-100">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`text-center items-center text-body3 font-semibold leading-7 tracking-[-0.048px] px-[15px] py-[11px] ${header.id !== 'icon' ? 'border-r-2' : ''}  border-gray-100 ${header.id == 'grade' ? 'bg-sub2_5 text-sub2_40' : ''}`}
                  onClick={() => handleCreate(header.id)}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`${cell.id} text-center px-[15px] py-[11px] text-body4 items-center leading-[25px] text-gray-800 border-t-[1px] ${!cell.id.includes('icon') ? 'border-r-2' : ''} border-gray-100`}
                  onClick={() => handleDelete(cell.id)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          {/* id 수정 필요 */}
          <RoomDeleteModal
            what="해당 회차의 성적을"
            setModalOpen={setModalOpen}
            examBoxId={selectedId}
            examId={examId}
          />
        </Modal>
      )}
      {createModalOpen && (
        <Modal onClose={() => setCreateModalOpen(false)}>
          <CreateModal setModalOpen={setCreateModalOpen} type="성적" id={selectedId} />
        </Modal>
      )}
    </div>
  );
};

export default Table;
