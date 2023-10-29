/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable react/jsx-no-useless-fragment */
import Cookies from "js-cookie";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Link from "next/link";
import useSWR from "swr";
import ModalEdit from "../modal-edit/[id]";
import ModalDelete from "../modal-delete/[id]";
import fetcher from "@/utils/fetcher";
import Likes from "../like/[id]";
import Replies from "../modal-replies/[id]";
import SkeletonPosts from "../skeleton-posts";
import moment from "moment/moment";

function Contents() {
  const {
    data: posts,
    isLoading,
    isValidating,
  } = useSWR(
    [
      "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { refreshInterval: 0, revalidateOnFocus: false }
  );
  return (
    <div className="w-full m-auto p-4 py-20 md:pl-60 md:py-8 md:w-2/3">
      {posts?.data?.map((item) => (
        <div key={item?.id}>
          {isLoading || isValidating ? (
            <SkeletonPosts />
          ) : (
            <div className="border-b-2 border-gray-200 py-4 p-4">
              <div className="flex justify-between items-center">
                <div className="flex">
                  {item?.is_own_post ? (
                    <Link href="/profile">
                      <Avatar name={item?.user?.name} />
                    </Link>
                  ) : (
                    <Link href={`/profile/${item?.users_id}`}>
                      <Avatar name={item?.user?.name} />
                    </Link>
                  )}
                  <div className="flex flex-col ml-3">
                    <h4 className="font-semibold text-lg">
                      {item?.user?.name}{" "}
                      {item?.updated_at !== item?.created_at ? (
                        <span className="font-light text-gray-500 text-sm">
                          {" "}
                          | edited
                        </span>
                      ) : (
                        ""
                      )}
                    </h4>
                    <p className="font-light text-gray-500">
                      <span>
                        {item?.user?.email} |{" "}
                        {moment(item?.created_at).startOf("hour").fromNow()}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex">
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
              </div>
              <div className="font-light px-2 py-4 text-xl text-justify">
                <p>{item?.description}</p>
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
          )}
        </div>
      ))}
    </div>
  );
}
export default Contents;
