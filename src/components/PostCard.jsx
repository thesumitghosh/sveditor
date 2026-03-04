import _ from "lodash";
import { useEffect, useState } from "react";
export default function PostCard({ post, onToggle, users }) {
  const verified = post.postVerified === true;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    console.log("postid", _.filter(users, { id: post.user_id })[0])
    setUserData(_.filter(users, { id: post.user_id })[0]);
  }, [])
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", marginBottom:"10px" }}>
        <img
          src={userData?.customimageurl !== null ? "https://serverapi.studyvarsity.com" + userData?.customimageurl : userData?.image}
          alt="Post"
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "25px"
          }}
          onError={(e) => {
            // If /icons/user.svg is broken, this runs
            e.currentTarget.src = "/user.svg";
          }}
        />
        <span className="ps-2">{_.filter(users, { id: post.user_id })[0]?.name}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        <h2
          style={{
            fontSize: "14px",
            fontWeight: 600,
            margin: 0,
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            maxWidth: "70%",
          }}
        >
          {post.title}
        </h2>

        <span
          style={{
            fontSize: "12px",
            padding: "4px 10px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            background: verified ? "#dcfce7" : "#fef3c7",
            color: verified ? "#15803d" : "#92400e",
            flexShrink: 0,
          }}
        >
          {verified ? "Verified" : "Unverified"}
        </span>
      </div>

      {/* IMAGE (ONLY IF EXISTS) */}
      {post.imageUrl && (
        <div
          style={{
            width: "100%",
            marginBottom: "12px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            src={"https://serverapi.studyvarsity.com" + post.imageUrl}
            alt="Post"
            style={{
              width: "100%",
              maxHeight: "260px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      {/* DESCRIPTION (HARD LIMITED, OVERFLOW SAFE) */}
      <div
        style={{
          maxHeight: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          marginBottom: "14px",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: post.description }}
          style={{
            all: "unset",            // 🔥 removes editor inline styles
            display: "block",
            fontSize: "14px",
            color: "#374151",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            maxWidth: "100%",
          }}
        />
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          background: verified ? "#dc2626" : "#16a34a",
          color: "#ffffff",
        }}
      >
        {verified ? "Unverify Now" : "Verify Now"}
      </button>
    </div>
  );
}
