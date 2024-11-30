import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { isEmail, strongPassword } from "../helpers/validator";
import requestApi from "../helpers/api";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({});
  const [errorForm, setErrorForm] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = (event) => {
    const input = event.target;
    setSignUpData((preData) => ({
      ...preData,
      [input.name]: input.value,
    }));
  };

  useEffect(() => {
    if (isSubmit) {
      validateForm();
    }
  }, [signUpData, isSubmit]);

  const validateForm = () => {
    let formIsValid = true;
    const errors = {};
    if (signUpData.username === "" || signUpData.username === undefined) {
      errors.username = "Tên người dùng không được trống.";
    }

    if (signUpData.email === "" || signUpData.email === undefined) {
      errors.email = "Email không được trống.";
    } else {
      const emailValid = isEmail(signUpData.email);
      if (!emailValid) {
        errors.email = "Vui lòng nhập email hợp lệ.";
      }
    }

    if (signUpData.password === "" || signUpData.password === undefined) {
      errors.password = "Mật khẩu không được trống.";
    } else if (!strongPassword(signUpData.password)) {
      errors.password = "Mật khẩu ít nhất 8 ký tự";
    } else if (signUpData.password !== signUpData["confirm-password"]) {
      errors["confirm-password"] = "Mật khẩu không trùng khớp.";
    }

    if (Object.keys(errors).length > 0) {
      setErrorForm(errors);
      formIsValid = false;
    } else {
      setErrorForm({});
    }

    return formIsValid;
  };
  const handleSignUp = async () => {
    const valid = validateForm();
    if (valid) {
      try {
        const newUser = {
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
        };
        await requestApi("user/register", "POST", newUser);
        navigate("/login");
      } catch (error) {
        console.log(error);
        //handle error here
      }
    }
    setIsSubmit(true);
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-screen lg:py-0">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng ký tài khoản
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên người dùng
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="tên người dùng"
                  required=""
                />
                {errorForm.username && (
                  <p className="text-red-600 mt-0.5">{errorForm.username}</p>
                )}
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
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
                  placeholder="••••••••"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {errorForm.password && (
                  <p className="text-red-600 mt-0.5">{errorForm.password}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {errorForm["confirm-password"] && (
                  <p className="text-red-600 mt-0.5">
                    {errorForm["confirm-password"]}
                  </p>
                )}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Tôi đồng ý với{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Điều khoản và chính sách dịch vụ
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Tạo tài khoản
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Bạn đã có tài khoản?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Đăng nhập
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
