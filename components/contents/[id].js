import Cookies from "js-cookie";
import Date from "../date";
import { Avatar } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ModalEdit from "../modal-edit/[id]";
import ModalDelete from "../modal-delete/[id]";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const PostId = () => {
  const router = useRouter();
  const { id } = router?.query;
  const { data: posts } = useSWR(
    [
      `https://paace-f178cafcae7b.nevacloud.io/api/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { refreshInterval: 500 }
  );
  return (
    <>
      <div className="w-full m-auto">
        {posts?.data?.map((item) => (
          <>
            <div
              key={item?.data?.id}
              className="border-b-2 border-gray-200 py-4 p-4"
            >
              <div className="py-2">
                <Avatar name={item?.user?.name} />
              </div>
              <div className="grid">
                <div className="grid ml-2 font-semibold">
                  <div className="grid grid-rows-2">
                    <div className="flex justify-between">
                      <h4>{item?.user?.name}</h4>
                      {item?.is_own_post ? (
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<BiDotsVerticalRounded />}
                            variant="ghost"
                            size="xl"
                            height={4}
                            width={4}
                          />
                          <MenuList>
                            <MenuItem>
                              <ModalEdit id={item?.id} />
                            </MenuItem>
                            <MenuItem color="red">
                              <ModalDelete id={item?.id} />
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <p className="font-light text-gray-500">
                        <span>
                          {item?.user?.email} |{" "}
                          <Date dateString={item?.created_at} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="font-light px-2 py-2 text-lg text-justify">
                  <p>{item?.description}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default PostId;
