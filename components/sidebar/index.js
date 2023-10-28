import Cookies from "js-cookie";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import Create from "../modal-create";
import { Avatar, IconButton } from "@chakra-ui/react";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { BiLogOut } from "react-icons/bi";
import Notification from "../modal-notification";
import Swal from "sweetalert2";

const Sidebar = () => {
  const router = useRouter();
  const { data } = useSWR(
    [
      "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { revalidateOnFocus: false }
  );
  const { mutate } = useMutation();

  const HandleLogout = () => {
    Swal.fire({
      title: "are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#d33",
      confirmButtonText: "logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await mutate({
          url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        });
        if (!res?.success) {
          console.log("Gagal Logout");
        } else {
          Cookies.remove("user_token");
          router.push("/login");
        }
      }
    });
  };

  return (
    <>
      <div className="flex-row hidden md:flex">
        <aside
          id="default-sidebar"
          className="top-0 left-0 z-0 w-72 h-full fixed"
          aria-label="Sidebar"
        >
          <div className="h-screen px-3 py-4 overflow-y-auto border-r-2 dark:bg-gray-800 grid content-between">
            <div className="p-8">
              <h1 className="font-semibold text-sky-500 text-4xl">
                <Link href="/">brand</Link>
              </h1>
            </div>
            <div className="p-8 space-y-4">
              <Link
                href="/"
                className="p-4 flex items-center space-x-3 border-transparent rounded-md hover:bg-gray-100"
              >
                <AiOutlineHome size={44} />{" "}
                <span className="text-2xl">home</span>
              </Link>
              <Notification />

              <Link
                href="/profile"
                className="p-4 flex items-center space-x-3 border-transparent rounded-md hover:bg-gray-100"
              >
                <Avatar name={data?.data?.name} />{" "}
                <span className="text-2xl"> {data?.data?.name}</span>
              </Link>
            </div>
            <div
              onClick={() => HandleLogout()}
              className="flex flex-row space-x-3 content-end items-center p-4 cursor-pointer border-transparent rounded-md hover:bg-gray-100"
            >
              <BiLogOut className="w-12 h-12" />
              <span className="text-2xl">logout</span>
            </div>
          </div>
        </aside>
        <Create />
      </div>
    </>
  );
};
export default Sidebar;
