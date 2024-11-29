import { useEffect, useState } from "react";
import { getUserInfo } from "../APIs/userApi";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";

function Profile({ show, setShow, id }) {
  const [user, setUser] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const isUpdated = useSelector((state) => state.auth.updateTimestamp);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo(id);
      setUser(data);
    };
    fetchData();
  }, [isUpdated]);

  const handleUpdate = () => {
    // write code here continue
    setShow(false);
    setShowUpdate(true);
  };

  return (
    <>
      <div
        id="medium-modal"
        tabIndex="-1"
        className={`fixed ${
          show ? "" : "hidden"
        } top-0 left-0 right-0 z-50 flex items-center  justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-lg max-h-full  ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Thông tin tài khoản
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="medium-modal"
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
            {/* Write content here */}
            <div className="p-4 text-white space-y-2">
              {user?.avatar_url ? (
                <img src={user?.avatar_url} alt="avatar" />
              ) : (
                <img src="src/assets/profile.png" alt="avatar" />
              )}
              <p>Tên: {user?.username}</p>
              <p>Nick name: {user?.nickname}</p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="medium-modal"
                type="button"
                onClick={handleUpdate}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cập nhật
              </button>
              <button
                data-modal-hide="medium-modal"
                type="button"
                onClick={handleClose}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpdateProfile show={showUpdate} setShow={setShowUpdate} user={user} />
    </>
  );
}

export default Profile;
