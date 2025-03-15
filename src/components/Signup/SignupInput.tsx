interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  id: string;
}

const SignupInput = ({ handleChange, value, placeholder, id }: InputProps) => {
  return (
    <div className="flex flex-col items-start py-6 px-4 gap-4">
      <input
        className="flex items-start gap-1.5 w-full px-3 py-2 border-2 border-gray-300 rounded-md"
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={handleChange}
      />
    </div>
  );
};

export default SignupInput;
