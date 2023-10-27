import Cookies from "js-cookie";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import Create from "../modal-create";
import { Avatar, IconButton } from "@chakra-ui/react";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { BiLogOut, BiUser } from "react-icons/bi";
import Notification from "../modal-notification";

const Footer = () => {
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
      <nav className="border fixed z-20 w-full bottom-0 border-t-2 bg-white md:hidden">
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
                  <span
                    href="#"
                    className="flex justify-center items-center w-8 h-8 "
                  >
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<Avatar name={data?.data?.name} />}
                      />

                      <MenuList>
                        <MenuGroup
                          title={data?.data?.name + " | " + data?.data?.email}
                        >
                          <MenuItem>
                            <Link href="/profile">
                              <div className="flex flex-row space-x-2 items-center">
                                <BiUser className="w-6 h-6" />
                                <span>my account</span>
                              </div>
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Notification />
                          </MenuItem>
                        </MenuGroup>
                        <MenuDivider />

                        <MenuItem onClick={() => HandleLogout()}>
                          <div className="flex flex-row space-x-2 items-center">
                            <BiLogOut className="w-6 h-6" />
                            <span>logout</span>
                          </div>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </span>
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
