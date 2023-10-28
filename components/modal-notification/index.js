/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

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
import fetcher from "@/utils/fetcher";
import Date from "../date";

function Notification() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: notification, isLoading } = useSWR(
    [
      "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token),
    { efreshInterval: 1000, revalidateOnFocus: false }
  );
  return (
    <>
      <div
        className="flex flex-row space-x-2 items-center md:space-x-3 md:p-4 md:border-transparent md:hover:bg-gray-100 md:rounded-md cursor-pointer"
        onClick={onOpen}
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
            {isLoading ? (
              <Spinner />
            ) : (
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
                          <Date dateString={item?.created_at} />
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Notification;
