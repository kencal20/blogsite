import ReactModal from "react-modal";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  className?: string;
};
ReactModal.setAppElement("#root");
export default function ModalComponent({
  isOpen,
  onRequestClose,
  children,
  className,
}: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // remove blue/gray overlay
      overlayClassName="fixed inset-0 flex items-center justify-center bg-transparent"
      // modal container
      className={`bg-white rounded-2xl  p-6 shadow-lg w-[70vw] h-auto mx-auto outline-none ${className || ""}`}
    >
      {children}
    </ReactModal>
  );
}
