import dynamic from "next/dynamic";
import Contents from "@/components/contents";

const DynamicLayout = dynamic(() => import("@/layout"));

export default function Home() {
  return (
    <DynamicLayout metaTitle="posts">
      <Contents />
    </DynamicLayout>
  );
}
