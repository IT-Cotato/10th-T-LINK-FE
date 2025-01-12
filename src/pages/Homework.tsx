import { Outlet, useNavigate } from 'react-router-dom';

const Homework = () => {
  const nav = useNavigate();
  return (
    <div>
      <button
        className="bg-primary_500"
        onClick={() => {
          nav('create');
        }}
      >
        +숙제 업로드
      </button>
      <Outlet />
    </div>
  );
};

export default Homework;
