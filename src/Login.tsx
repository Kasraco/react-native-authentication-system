import { useRef, useState, useEffect, FormEvent } from "react";

const Login = () => {
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
    console.log(user, pwd);
    setUser("");
    setPwd("");
    setErrMsg("ss");
    //setSuccess(false);
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
