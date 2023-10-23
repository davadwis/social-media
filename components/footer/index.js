import Cookies from "js-cookie";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { useQueries } from "@/hooks/useQueries";
import { Dropdown } from "flowbite-react";
import { HiLogout } from "react-icons/hi";
import Create from "../modal-create";
import { Avatar } from "flowbite-react";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });
  console.log(data);
  const { mutate } = useMutation();

  const HandleLogout = async () => {
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
  };
  return (
    <>
      <nav className="border fixed z-20 w-full bottom-0 border-t-2 backdrop-blur-sm md:hidden">
        <div className="max-w-screen-xl flex flex-wrap items-center content-center justify-center mx-auto p-4 h-[64px]">
          <div
            className="items-center w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <div className="flex justify-center content-center text-lg font-light">
              <div className="flex space-x-8 content-center">
                <Link href="/" className="pt-2">
                  <AiOutlineHome size={36} />
                </Link>
                <Create />
                <div className="pt-2">
                  <Link
                    href="#"
                    className="flex justify-center items-center border-transparent rounded-full w-8 h-8 bg-sky-500 text-white text-xl font-light"
                  >
                    <Dropdown
                      inline
                      arrowIcon={false}
                      label={<Avatar rounded />}
                    >
                      <Dropdown.Header>
                        <span className="block text-sm">
                          {data?.data?.name}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {data?.data?.email}
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item
                        icon={HiLogout}
                        onClick={() => HandleLogout()}
                      >
                        Sign out
                      </Dropdown.Item>
                    </Dropdown>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Footer;
