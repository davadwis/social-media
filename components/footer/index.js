import Cookies from "js-cookie";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import useSWR from "swr";
import { BiLogOut, BiUser } from "react-icons/bi";
import Swal from "sweetalert2";
import Notification from "../modal-notification";
import { useMutation } from "@/hooks/useMutation";
import fetcher from "@/utils/fetcher";
import Create from "../modal-create";

function Footer() {
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
      confirmButtonColor: "#3085d6",
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
    <nav className="fixed z-20 w-full bottom-0 border-t-2 bg-white md:hidden">
      <div className="max-w-screen-xl flex flex-wrap items-center content-center justify-center mx-auto p-4 h-[64px]">
        <div
          className="items-center w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <div className="flex justify-center content-center text-lg font-light">
            <div className="flex space-x-8 content-center items-center">
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
                        title={`${data?.data?.name} | ${data?.data?.email}`}
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
  );
}
export default Footer;
