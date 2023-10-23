"use client";
import { Dropdown } from "flowbite-react";
import {
  HiLogout,
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { Sidebar } from "flowbite-react";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

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
      <nav className="border fixed z-20 w-full top-0 border-b-2 backdrop-blur-sm md:hidden">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4 h-[64px]">
          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <div className="flex justify-between text-lg font-light">
              <div>
                <h1 className="font-semibold text-sky-500">brand</h1>
              </div>
              <div>
                <Dropdown label={data?.data?.name} inline>
                  <Dropdown.Header>
                    <span className="block text-sm">{data?.data?.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {data?.data?.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item icon={HiLogout} onClick={() => HandleLogout()}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
