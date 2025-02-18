type TagProps = {
  tag: {
    id: number;
    title: string;
    isClicked: boolean;
  };
  onClick: (id: number, title: string) => void;
  isNoSharp?: boolean;
};

const SubjectTag = ({ tag, onClick, isNoSharp }: TagProps) => {
  return (
    <button
      onClick={() => onClick(tag.id, tag.title)}
      className={`px-3 py-1 rounded-full text-sm leading-7 ${tag.isClicked ? 'bg-primary_700 text-white' : 'bg-gray-50 text-gray-500'}`}
    >
      {isNoSharp ? tag.title : `#${tag.title}`}
    </button>
  );
};

export default SubjectTag;
