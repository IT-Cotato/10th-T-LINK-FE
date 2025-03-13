interface TitleProps {
  title1: string;
  title2: string;
}
const SignupTitle = ({ title1, title2 }: TitleProps) => {
  return (
    <div className="flex flex-col items-start py-4 px-5">
      <h1 className="text-heading6 font-bold text-gray-900 leading-10">{title1}</h1>
      <h3 className="text-body3 font-regular text-gray-600 leading-7">{title2}</h3>
    </div>
  );
};

export default SignupTitle;
