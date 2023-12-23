import { useDispatch } from "react-redux";
import { logout } from "../../app/authSlice";

const SignOut = () => {
  const dispatch = useDispatch();

  dispatch(logout());
  return <></>;
};
export default SignOut;
