import React, { ReactNode } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PaymentPopup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    <div className="popup" onClick={handleBackdropClick}>
      <div
        className="popup-inner"
        style={{
          height: "100%",
          width: "800px",
        }}
      >
        {children}
        <div className="popup-backdrop"></div>
      </div>
    </div>
  );
};

export default PaymentPopup;
