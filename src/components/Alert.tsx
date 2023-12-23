import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  alertType: string;
  onClose: () => void;
}
const Alert = ({ children, alertType, onClose }: AlertProps) => {
  return (
    <div className={"alert alert-" + alertType}>
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
