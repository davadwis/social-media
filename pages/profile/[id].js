import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Avatar,
} from "@chakra-ui/react";
import PostId from "@/components/contents/[id]";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const DynamicLayout = dynamic(() => import("@/layout"));
const Profile = () => {
  const router = useRouter();
  const { id } = router?.query;
  const { data } = useSWR(
    [
      `https://paace-f178cafcae7b.nevacloud.io/api/user/${id}`,
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
    <>
      <DynamicLayout metaTitle={"Profile " + data?.data?.name}>
        <div className="p-2 m-auto py-20 md:w-1/2 md:py-8 md:pl-20 w-full">
          <div className="flex flex-col">
            <div>
              <Card size="lg">
                <CardHeader>
                  <div className="flex justify-start items-center">
                    <Avatar name={data?.data?.name} size="xl" />
                    <div className="flex flex-col">
                      <Heading size="md" className="ml-4">
                        {data?.data?.name}
                      </Heading>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Box>
                          <Heading size="xs">Email</Heading>
                          <Text pt="2" fontSize="sm">
                            {data?.data?.email}
                          </Text>
                        </Box>
                      </div>
                      <div>
                        <Box>
                          <Heading size="xs">Phone</Heading>
                          <Text pt="2" fontSize="sm">
                            {data?.data?.phone}
                          </Text>
                        </Box>
                      </div>
                      <div>
                        <Box>
                          <Heading size="xs">Hobby</Heading>
                          <Text pt="2" fontSize="sm">
                            {data?.data?.hobby}
                          </Text>
                        </Box>
                      </div>
                      <div>
                        <Box>
                          <Heading size="xs">Day of Birth</Heading>
                          <Text pt="2" fontSize="sm">
                            {data?.data?.dob}
                          </Text>
                        </Box>
                      </div>
                    </div>
                  </Stack>
                </CardBody>
              </Card>
            </div>
            <div className="text-center font-semibold text-2xl py-4 border-b-2">
              <h4>Posts</h4>
            </div>
            <div className="w-full">
              <PostId />
            </div>
          </div>
        </div>
      </DynamicLayout>
    </>
  );
};
export default Profile;
