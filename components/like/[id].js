/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { useMutation } from "@/hooks/useMutation";

function Likes({ id, isLiked }) {
  const { mutate } = useMutation();
  const [liked, setLiked] = useState(isLiked);
  const router = useRouter();
  const { mutate: mutation } = useSWRConfig();

  const handleLike = async () => {
    if (!liked) {
      const res = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${id}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      if (res?.success) {
        setLiked(true);
        mutation("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all");
      }
    } else {
      const res = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${id}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      if (res?.success) {
        setLiked(false);
        mutation("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all");
      }
    }
  };

  return (
    <>
      {isLiked ? (
        <button onClick={() => handleLike()}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 20 18"
          >
            <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
          </svg>
        </button>
      ) : (
        <button onClick={() => handleLike()}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 19"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
            />
          </svg>
        </button>
      )}
    </>
  );
}
export default Likes;
