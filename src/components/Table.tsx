import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { IoMdAdd } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import RoomDeleteModal from './Modal/RoomDeleteModal';
import Modal from './Modal/Modal';
import CreateModal from './Modal/CreateModal';

type Grade = {
  round: number;
  title: string;
  grade: number;
  icon: React.ElementType;
};

const defaultData: Grade[] = [
  {
    round: 1,
    title: '2-2 중간고사',
    grade: 78,
    icon: FiTrash2,
  },
  {
    round: 2,
    title: '2-2 중간고사',
    grade: 78,
    icon: FiTrash2,
  },
  {
    round: 3,
    title: '2-2 중간고사',
    grade: 78,
    icon: FiTrash2,
  },
];

const columnHelper = createColumnHelper<Grade>();

const columns = [
  columnHelper.accessor('round', {
    cell: (info) => info.getValue(),
    header: () => <span>회차</span>,
  }),
  columnHelper.accessor((row) => row.title, {
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => <span>시험 이름</span>,
  }),
  columnHelper.accessor('grade', {
    cell: (info) => info.renderValue(),
    header: () => <span>점수</span>,
  }),
  columnHelper.accessor('icon', {
    header: () => <IoMdAdd className="w-full stroke-[6px] h-5" />,
    cell: (info) => {
      const Icon = info.getValue(); // 저장된 React.ElementType을 가져옴
      return <Icon className="h-5 cursor-pointer w-full" />;
    },
  }),
];

const Table = () => {
  const [data, _setData] = useState(() => [...defaultData]);
  const [modalOpen, setModalOpen] = useState(false); // 삭제 모달
  const [createModalOpen, setCreateModalOpen] = useState(false); // 삭제 모달

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete = (id: string) => {
    if (id.includes('icon')) {
      setModalOpen(true);
    }
  };

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
          <RoomDeleteModal stat={true} what="성적" setModalOpen={setModalOpen} />
        </Modal>
      )}
      {createModalOpen && (
        <Modal onClose={() => setCreateModalOpen(false)}>
          <CreateModal setModalOpen={setCreateModalOpen} />
        </Modal>
      )}
    </div>
  );
};

export default Table;
