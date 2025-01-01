import DetailButton from '../components/DetailButton';
const RoomDetail = () => {
  return (
    <div className="flex-col flex gap-5">
      <h2>100일 째 함께 공부중</h2>
      <div className="grid grid-cols-2 gap-4">
        <DetailButton type="materials" />
        <DetailButton type="homework" />
        <DetailButton type="stats" />
        <DetailButton type="counseling" />
      </div>
      <DetailButton type="payment" />
    </div>
  );
};

export default RoomDetail;
