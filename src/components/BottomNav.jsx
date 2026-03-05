"use client";
import React, { useEffect, useState } from "react";
/* import ProfileMenu from "../auth/ProfileMenu"; */
/* import Search from "../dashpages/Search"; */
import Link from "next/link";
import Image from "next/image";
/* import { useSession } from "next-auth/react"; */
import _ from "lodash";
import axios from "axios";

export default function DashNavFooter() {
  /*   const { data: session, status } = useSession(); */
  const [unreadCount, setUnreadCount] = useState(0);

  /*   useEffect(() => {
      async function fetchNotifications() {
        try {
          const response = await axios.get(`https://serverapi.studyvarsity.com/api/notifications/${session?.user?.id}?page=1&limit=10`);
  
  
  
          const result = response.data;
          console.log("resultnoti", result);
  
          setUnreadCount(result.unreadCount || 0);
        } catch (error) {
          console.log("noti error", error);
        }
      };
      fetchNotifications();
    }, [session]) */

  return (
    <nav className="bg-white fixed bottom-0 z-101" style={{ width: "100%", boxShadow: "0 0 10px lightgray" }}>
      <div className="px-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <Link
          href="https://www.studyvarsity.com"
          className="py-2 pe-3 rounded-full hover:bg-[#ededed] flex items-center"

        >
          <img
            src={`https://www.studyvarsity.com/icons/home.svg`}
            alt="Home Icon"
            title="Home"
            width={24} height={24}
          />
          <span className="hidden xxl:inline"></span>
        </Link>
        {/* !_.isEmpty(session?.user) */ true &&
          <Link
            href="https://www.studyvarsity.com/notifications"
            className="py-2 px-4 rounded-full hover:bg-[#ededed] flex items-center"

          >
            <img
              src={`https://www.studyvarsity.com/icons/notification.svg`}
              alt="message Icon"
              title="Notifications"
              width={26} height={26}
            />
           {/*  {!_.isEmpty(session?.user) && unreadCount > 0 &&
              <span
                style={{

                  top: "-5px",
                  right: "-8px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0px 3px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  minWidth: "20px",
                  textAlign: "center",
                  marginLeft: "-15px",
                  marginTop: "-23px"
                }}
              >
                {unreadCount}
              </span>
            } */}
            <span className="hidden xxl:inline"></span>
          </Link>
        }
        <Link
          href="https://www.studyvarsity.com/projects"
          className="py-2 px-4 rounded-full hover:bg-[#ededed] flex items-center"

        >
          <img
            src={`https://www.studyvarsity.com/icons/projectgroup.svg`}
            alt="Projects Icon"
            title="Projects"
            width={24} height={24}
          />
          <span className="hidden xxl:inline"></span>
        </Link>

        {/* <Link
          href="/messages"
          className="py-2 px-4 rounded-full hover:bg-[#ededed] flex items-center"

        >
          <Image
            src={`https://www.studyvarsity.com/icons/message.svg`}
            alt="message Icon"
            title="Message"
            width={24} height={24}
          />
          <span className="hidden xxl:inline"></span>
        </Link> */}
        <Link
          href="https://www.studyvarsity.com/ask"
          className="py-2 px-2 rounded-full hover:bg-[#ededed] flex items-center"

        >
          <img
            src={`https://www.studyvarsity.com/icons/aisearch.svg`}
            alt="trendup Icon"
            title="Trending"
            width={50} height={50}
          />
          <span className="hidden xxl:inline"></span>
        </Link>
        <Link
          href="https://www.studyvarsity.com/trending"
          className="py-2 px-4 rounded-full hover:bg-[#ededed] flex items-center"

        >
          <img
            src={`https://www.studyvarsity.com/icons/trendup.svg`}
            alt="trendup Icon"
            title="Trending"
            width={24} height={24}
          />
          <span className="hidden xxl:inline"></span>
        </Link>
        <Link
          href="https://www.studyvarsity.com/learninghub"
          className="py-2 px-3 rounded-full hover:bg-[#ededed] flex items-center"

        >
          <img
            src={`https://www.studyvarsity.com/icons/bookopen.svg`}
            alt="Interviews Icon"
            title="Interviews"
            width={24} height={24}
          />
          <span className="hidden xxl:inline"></span>
        </Link>
        <Link
          href="https://editor.studyvarsity.com"
          className="py-2 px-4 rounded-full hover:bg-[#ededed] flex items-center"

        >
          <img
            src={`https://www.studyvarsity.com/icons/codedevelop.svg`}
            alt="Editor Icon"
            title="Editor"
            width={24} height={24}
          />
          <span className="hidden xxl:inline"></span>
        </Link>

      </div>
    </nav>
  );
}
