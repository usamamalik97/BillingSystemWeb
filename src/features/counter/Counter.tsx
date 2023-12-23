import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import { RootState, AppDispatch } from "../../app/store";
import React, { useState } from "react";

// Login.tsx
import { login, logout } from "../../app/authSlice";

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const count = useSelector((state: RootState) => state.auth.user);

  console.log(count);
  const handleLogin = () => {
    // Perform authentication logic (e.g., API call)

    // If authentication is successful, dispatch the login action
    dispatch(login({ user, password: "password" }));
  };
  const handleLogout = () => {
    // Perform authentication logic (e.g., API call)

    // If authentication is successful, dispatch the login action
    dispatch(logout());
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Counter;

/*
const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch: AppDispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };
  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch(incrementByAmount(addValue))}>
        Add Amount
      </button>
      <button onClick={() => dispatch(reset())}>reset</button>
    </section>
  );
};

export default Counter;
*/
