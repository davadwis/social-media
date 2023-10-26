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
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { Spinner } from "@chakra-ui/react";
import Likes from "../like/[id]";
import Replies from "../modal-replies/[id]";

const Contents = () => {
  const { data: posts, isLoading } = useSWR(
    [
      "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { refreshInterval: 1000 }
  );
  return (
    <>
      <div className="w-full m-auto p-4 py-20 md:pl-60 md:py-8 md:w-2/3">
        {isLoading ? (
          <>
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          </>
        ) : (
          <>
            {posts?.data?.map((item) => (
              <>
                <div
                  key={item?.id}
                  className="border-b-2 border-gray-200 py-4 p-4"
                >
                  <div className="py-2">
                    {item?.is_own_post ? (
                      <Link href="/profile">
                        <Avatar name={item?.user?.name} />
                      </Link>
                    ) : (
                      <Link href={`/profile/${item?.users_id}`}>
                        <Avatar name={item?.user?.name} />
                      </Link>
                    )}
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
                  <div className="flex gap-4 justify-end">
                    <div className="flex items-center content-center gap-1">
                      <Likes id={item?.id} isLiked={item?.is_like_post} />
                      <span> {item?.likes_count}</span>
                    </div>
                    <div className="flex items-center content-center gap-1">
                      <Replies
                        id={item?.id}
                        userPost={item?.user?.name}
                        post={item?.description}
                        postCreated={item?.created_at}
                        isOwnPost={item?.is_own_post}
                        repliesCount={item?.replies_count}
                      />
                      <span> {item?.replies_count}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default Contents;
