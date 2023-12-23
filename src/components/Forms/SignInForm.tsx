interface SignInFormProperties {
  title: string;
  onSubmit?: () => void;
}
const SignInForm = ({ title, onSubmit }: SignInFormProperties) => {
  const divStyle = {
    maxWidth: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vh",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };
  return (
    <div className="card border-info mb-3" style={divStyle}>
      <div className="card-header">
        <b>
          <i>HassanHardware</i>
        </b>
      </div>
      <form className="row g-3" name={title}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
