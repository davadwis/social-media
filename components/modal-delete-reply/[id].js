/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from "flowbite-react";
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
} from "@chakra-ui/react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { useMutation } from "@/hooks/useMutation";

function ModalDeleteReply({ id }) {
  const { mutate } = useMutation();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: mutation } = useSWRConfig();

  const HandleSubmit = async () => {
    const res = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (res?.success) {
      Swal.fire({
        icon: "success",
        text: "reply has been deleted",
        timer: 2000,
        confirmButtonColor: "rgb(56 189 248)",
        toast: true,
        position: "top",
      });
      onClose();
      mutation(
        `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`
      );
      router.reload();
    }
  };

  return (
    <>
      <span onClick={onOpen} className="text-red-600">
        delete
      </span>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <span className="font-semibold">DELETE</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
            <p className="font-semibold text-xl text-center">are you sure?</p>
          </ModalBody>
          <ModalFooter>
            <Button gradientMonochrome="failure" onClick={() => HandleSubmit()}>
              delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalDeleteReply;
