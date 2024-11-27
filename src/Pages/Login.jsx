import { useEffect, useState } from "react";
import { isEmail, strongPassword } from "../helpers/validator";
import requestApi from "../helpers/api";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/actions/authAction";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});
  const [errorForm, setErrorForm] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = (event) => {
    const input = event.target;

    setLoginData((preData) => ({
      ...preData,
      [input.name]: input.value,
    }));
  };

  useEffect(() => {
    if (isSubmit) {
      validateForm();
    }
  }, [loginData, isSubmit]);

  const validateForm = () => {
    let formIsValid = true;
    const errors = {};
    if (loginData.email === "" || loginData.email === undefined) {
      errors.email = "Email không được trống.";
    } else {
      const emailValid = isEmail(loginData.email);
      if (!emailValid) {
        errors.email = "Vui lòng nhập email hợp lệ.";
      }
    }

    if (loginData.password === "" || loginData.password === undefined) {
      errors.password = "Mật khẩu không được trống.";
    } else {
      if (!strongPassword(loginData.password)) {
        errors.password = "Mật khẩu ít nhất 8 ký tự";
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrorForm(errors);
      formIsValid = false;
    } else {
      setErrorForm({});
    }

    return formIsValid;
  };

  const onLogin = () => {
    const valid = validateForm();
    if (valid) {
      const response = requestApi("auth/login", "POST", loginData);
      response
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          const userData = jwtDecode(res.data.access_token);
          dispatch(loginSuccess(userData));

          navigate("/channels");
        })
        .catch((error) => console.log(error));
    }
    setIsSubmit(true);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Chào mừng bạn đến với Gatherings
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="yourname@gmail.com"
                  required=""
                />
                {errorForm.email && (
                  <p className="text-red-600 mt-0.5">{errorForm.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={onChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {errorForm.password && (
                  <p className="text-red-600 mt-0.5">{errorForm.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium  hover:underline text-white"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type="button"
                onClick={onLogin}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng nhập
              </button>

              <p className="text-sm font-light text-gray-400 dark:text-gray-400">
                Bạn chưa có tài khoản?{" "}
                <a
                  href="/sign-up"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 "
                >
                  Đăng ký
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
