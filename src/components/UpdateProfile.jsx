import { updateUser } from "../APIs/userApi";
import { useDispatch } from "react-redux";
import { updateSuccess } from "../redux/actions/authAction";

function UpdateProfile({ show, setShow, user }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = async () => {
    const username = document.getElementById("name").value;
    const nickname = document.getElementById("nickname").value;
    if (username || nickname) {
      await updateUser(user.id, { username, nickname });
      setShow(false);
      dispatch(updateSuccess({ sub: 9 }));
    }
  };

  return (
    <>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          show ? "" : "hidden"
        } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cập nhật thông tin tài khoản
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Đóng</span>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tên tài khoản"
                    required=""
                    defaultValue={user?.username}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="nickname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nickname
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    id="nickname"
                    defaultValue={user?.nickname}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nick name"
                    required=""
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Lưu
              </button>
              <button
                data-modal-hide="medium-modal"
                type="button"
                onClick={handleClose}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
