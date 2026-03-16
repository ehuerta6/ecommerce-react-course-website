import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);

  const { signUp, user, logout, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || result.error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && (
            <>
              <p>User logged in {user.email}</p>
              <button onClick={logout}>LogOut</button>
            </>
          )}

          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                {...register("email")}
              />

              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
              />

              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button className="btn btn-primary btn-large" type="submit">
              {mode === "signup" ? "Sign Up" : "Log In"}
            </button>
          </form>
          <div className="auth-switch">
            <p>
              {mode === "signup"
                ? "Already have an account? "
                : "Don't have an account? "}
              <span
                className="auth-link"
                onClick={() => setMode(mode === "signup" ? "login" : "signup")}
              >
                {mode === "signup" ? "Log in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
