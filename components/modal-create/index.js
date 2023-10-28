/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-use-before-define */

"use client";

import { Button } from "flowbite-react";
import { useState } from "react";
import { BsPen } from "react-icons/bs";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { useMutation } from "@/hooks/useMutation";
import fetcher from "@/utils/fetcher";

function Create() {
  const { mutate } = useMutation();
  const router = useRouter();
  const [payload, setPayload] = useState({
    description: "",
  });

  const { trigger: triggerAllPosts } = useSWRMutation(
    [
      "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { revalidateOnFocus: false }
  );

  const { trigger: triggerMyPosts } = useSWRMutation(
    [
      "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=me",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { revalidateOnFocus: false }
  );

  const HandleSubmit = async () => {
    const res = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/post",
      payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (res?.success) {
      Swal.fire({
        icon: "success",
        text: "post has been added",
        timer: 2000,
        confirmButtonColor: "rgb(56 189 248)",
        toast: true,
        position: "top",
      });
      onClose();
      setPayload({
        description: "",
      });
      triggerAllPosts();
      triggerMyPosts();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        gradientDuoTone="purpleToBlue"
        className="rounded-full h-12 w-12 md:fixed md:bottom-0 md:right-0 md:mr-20 md:mb-10 md:w-16 md:h-16"
      >
        <svg
          className="w-6 h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 1v16M1 9h16"
          />
        </svg>
      </Button>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>add new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Textarea
                id="description"
                type="text"
                placeholder="what's happening ..."
                required
                value={payload?.description}
                onChange={(event) =>
                  setPayload({ ...payload, description: event.target.value })
                }
                className="focus:ring-sky-400"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => HandleSubmit()}
            >
              post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Create;
