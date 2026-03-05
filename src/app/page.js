import Image from "next/image";
import LoginPage from "./admin/login/page";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import CodeEditor from "./admin/codeEditor/page";


export default function Home() {
  return (
    <>
      <TopNav />
      <div className="" style={{paddingTop:"60px"}}>
        <CodeEditor />
      </div>
      <BottomNav />
    </>
  );
}
