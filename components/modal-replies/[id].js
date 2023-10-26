"use client";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Avatar,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Link from "next/link";
import Date from "../date";
import ModalDeleteReply from "../modal-delete-reply/[id]";

const Replies = ({
  id,
  userPost,
  post,
  postCreated,
  isOwnPost,
  repliesCount,
}) => {
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    description: "",
  });

  const { data: replies, mutate: mutation } = useSWR(
    [
      `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { refreshInterval: 300000, revalidateOnFocus: "false" }
  );

  const HandleSubmit = async () => {
    const res = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (res?.success) {
      Swal.fire({
        icon: "success",
        text: "your replies have been added",
        timer: 2000,
        confirmButtonColor: "rgb(56 189 248)",
        toast: true,
        position: "top",
      });
      setPayload({
        description: "",
      });
      mutation(
        `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`
      );
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12.5 4.046H9V2.119c0-.921-.9-1.446-1.524-.894l-5.108 4.49a1.2 1.2 0 0 0 0 1.739l5.108 4.49C8.1 12.5 9 11.971 9 11.051V9.123h2a3.023 3.023 0 0 1 3 3.046V15a5.593 5.593 0 0 0-1.5-10.954Z"
          />
        </svg>
      </button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="sm"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid border-b-2 p-4">
              <div className="flex">
                {isOwnPost ? (
                  <Link href="/profile">
                    <Avatar name={userPost} />
                  </Link>
                ) : (
                  <Link href={`/profile/${id}`}>
                    <Avatar name={userPost} />
                  </Link>
                )}
                <div className="flex-col ml-3">
                  <h4 className="font-semibold text-lg">{userPost}</h4>
                  <Text className="text-gray-600 font-light">
                    <Date dateString={postCreated} />
                  </Text>
                </div>
              </div>
              <div>
                <p className="text-justify pt-2">{post}</p>
              </div>
            </div>
            <Text className="font-semibold pt-2">Replies :</Text>
            {repliesCount === 0 ? (
              <h3 className="text-center p-8 text-2xl font-semibold">
                No Replies
              </h3>
            ) : (
              <>
                {replies?.data?.map((item) => (
                  <Card size="sm" className="my-2">
                    <CardBody>
                      <div className="flex space-x-2 content-center items-center">
                        <div>
                          {item?.is_own_reply ? (
                            <Link href="/profile">
                              <Avatar h={10} w={10} name={item?.user?.name} />
                            </Link>
                          ) : (
                            <Link href={`/profile/${item?.users_id}`}>
                              <Avatar h={10} w={10} name={item?.user?.name} />
                            </Link>
                          )}
                        </div>
                        <div className="flex-col">
                          <h4 className="text-lg font-semibold">
                            {item?.user?.name}{" "}
                            <span className="text-gray-600 font-light text-sm">
                              <Date dateString={item?.created_at} />
                            </span>
                          </h4>
                          <Text>{item?.description}</Text>
                        </div>
                      </div>
                      <div className="flex text-sm content-end items-end justify-end">
                        {item?.is_own_reply ? (
                          <ModalDeleteReply id={item?.id} />
                        ) : (
                          ""
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <FormControl className="mr-3">
              <Textarea
                id="description"
                type="text"
                placeholder=" what's happening ..."
                required
                value={payload?.description}
                onChange={(event) =>
                  setPayload({ ...payload, description: event.target.value })
                }
                className="focus:ring-sky-400"
                rows={1}
                variant="unstyled"
              />
            </FormControl>
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => HandleSubmit()}
            >
              reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Replies;
