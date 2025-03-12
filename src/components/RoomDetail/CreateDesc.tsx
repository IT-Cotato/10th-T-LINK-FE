interface CreateDescProps {
  title: string;
  desc: string;
}

const CreateDesc = ({ title, desc }: CreateDescProps) => {
  return (
    <div className="py-4">
      <p className="text-heading6 font-bold leading-10 text-gray-900">{title}</p>
      <p
        className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600"
        style={{ whiteSpace: 'pre-line' }}
      >
        {desc}
      </p>
    </div>
  );
};

export default CreateDesc;
