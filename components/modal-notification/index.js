/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import Cookies from "js-cookie";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Avatar,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import useSWR from "swr";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import moment from "moment/moment";
import fetcher from "@/utils/fetcher";
import { useMutation } from "@/hooks/useMutation";

function Notification() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: notification, trigger } = useSWRMutation(
    [
      "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { revalidateOnFocus: false }
  );
  return (
    <>
      <div
        className="flex flex-row space-x-2 items-center md:space-x-3 md:p-4 md:border-transparent md:hover:bg-gray-100 md:rounded-md cursor-pointer"
        onClick={() => {
          onOpen();
          trigger();
        }}
      >
        <IoMdNotificationsOutline className="w-6 h-6 md:w-12 md:h-12" />
        <span className="md:text-2xl">notification</span>
      </div>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              {notification?.data?.map((item) => (
                <Card key={item?.id} className="my-2">
                  <CardBody>
                    <div className="flex items-center">
                      <Link href={`/profile/${item?.user?.id}`}>
                        <Avatar name={item?.user?.name} size="sm" />
                        <span className="font-semibold text-lg ml-2">
                          {item?.user?.name}
                        </span>
                      </Link>
                    </div>
                    <div className="pt-2 text-lg font-light">
                      <p>has {item?.remark} your post</p>
                      <p className="flex text-sm justify-end">
                        {moment(item?.created_at).startOf("hour").fromNow()}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Notification;
