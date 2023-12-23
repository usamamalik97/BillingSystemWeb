import React, { ReactNode } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const handlePrint = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    window.print();
  };
  if (!isOpen) return null;
  return (
    <div className="popup" onClick={handleBackdropClick}>
      <div
        className="popup-inner"
        onClick={handlePrint}
        style={{
          height: "100%",
          width: "1200px",
        }}
      >
        {children}
        <div className="popup-backdrop"></div>
      </div>
    </div>
  );
};

export default Popup;
