interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <>
      <div className="fixed flex items-center justify-center inset-0 h-screen bg-black bg-opacity-60 max-w-[500px] mx-auto z-10">
        {children}
      </div>
    </>
  );
};

export default Modal;
