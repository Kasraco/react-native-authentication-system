import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";

// regex for user validation
const USER_REGEX = /^[a-zA-Z][a-zA-Z-0-9-_]{3,23}$/;
// regex for password validation
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [pwdMatch, setPwdMatch] = useState("");
  const [validPwdMatch, setValidPwdMatch] = useState(false);
  const [pwdMatchFocus, setPwdMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    //for focus curser in input box
    userRef.current.focus();
  }, []);
  //choon araye khalist faghat zamany bargozary mishavad ke component bargiri Mishavar

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log("Valid PWD : " + result);
    setValidPwd(result);
    const match = pwd === pwdMatch && pwdMatch != "";
    setValidPwdMatch(match);
    console.log("Valid PWD Match : " + match);
  }, [pwd, pwdMatch]);

  //clear message even change each one user,pwd pwdMatch
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, pwdMatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));

      setSuccess(true);

      // clear input fields
    } catch (err) {
      if (!err?.response) {
        //ertebat ba server ghat shodeh
        setErrMsg("No server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("username taken");
      } else {
        setErrMsg("regstiration failed");
      }

      // motemarkez mishavim roy an field khatadar
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">SignIn</a>
          </p>
        </section>
      ) : (
        <section className="w-96 bg-blue-700 p-5 text-white rounded-lg text-left  flex flex-col gap-6">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>

          <h1>Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start">
            <label htmlFor="username" className="block text-center">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setUser(e.target.value)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={userFocus && user && !validName ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 charcters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores,hyphens allowed.
            </p>

            {/* Password pane */}
            <label htmlFor="password" className="block text-center">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="Password"
              autoComplete="off"
              required
              onChange={(e) => setPwd(e.target.value)}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwddnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwddnote"
              className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 charcters <br />
              Must include uppercase lowercase letters,a number and special character <br />
              Allow special characters: <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">$</span>
              <span aria-label="percent">%</span>
            </p>

            {/* Confirm Password */}

            <label htmlFor="confirmpassword" className="block text-center">
              Confirm Password:
              <span className={validPwdMatch ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwdMatch || !pwdMatch ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirmpassword"
              autoComplete="off"
              required
              onChange={(e) => setPwdMatch(e.target.value)}
              aria-invalid={validPwdMatch ? "false" : "true"}
              aria-describedby="confirmdnote"
              onFocus={() => setPwdMatchFocus(true)}
              onBlur={() => setPwdMatchFocus(false)}
            />
            <p
              id="confirmdnote"
              className={pwdMatchFocus && !validPwdMatch ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field. <br />
            </p>

            <button
              type="submit"
              disabled={!validName || !validPwd || !validPwdMatch ? true : false}
            >
              Sign Up
            </button>
          </form>

          <p>
            Already Register?
            <br />
            <span className="underline">
              {/* Put router link here */}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
