import studentRole from '../assets/images/studentRole.png';
const RoleSelectionButton = () => {
  return (
    <div className="flex border rounded-sm">
      <img className="w-12 h-12" src={studentRole} alt="학생 role" />
      <div>
        <h1>학생</h1>
        <h3>선생님과 소통하고, 과제를 제출해요.</h3>
      </div>
    </div>
  );
};

export default RoleSelectionButton;
