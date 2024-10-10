import { useRef, useState, useEffect, FormEvent, useContext } from "react";
import AuthContext from "./context/AuthProvider";

import axios from "./api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, user]);

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");

      setSuccess(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("unAuthorized");
      } else {
        setErrMsg("Login faild");
      }

      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <p>
            <a href="#">Go To Home</a>
          </p>
        </section>
      ) : (
        <section className="w-96 bg-blue-700 p-5 text-white rounded-lg text-left  flex flex-col gap-6">
          <p ref={errRef} aria-live="assertive" className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handelSubmit} className="flex flex-col justify-start items-start">
            <label htmlFor="userName" className="block text-center">
              Username:
            </label>
            <input
              type="text"
              id="username"
              required
              autoComplete="off"
              ref={userRef}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="password" className="block text-center">
              Password:
            </label>
            <input
              type="password"
              id="password"
              required
              autoComplete="off"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />

            <button type="submit">Sign In</button>
          </form>

          <p>
            Need an Account?
            <br />
            <span className="underline">
              {/* Put router link here */}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
