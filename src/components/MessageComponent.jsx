import { Avatar, Image } from "antd";
import dayjs from "dayjs";
import React from "react";

const MessageComponent = ({ data, user }) => {
  return (
    <>
      {data.imageUrl && (
        <div
          className={`flex ${
            user?.id === data.userId ? "justify-end" : ""
          } p-2 `}
        >
          <Image src={data.imageUrl} alt={data.id} width={150} height={150} />
        </div>
      )}
      {data.content && (
        <div
          className={`flex items-center gap-2 ${
            user?.id === data.userId ? "justify-end" : ""
          } p-2 `}
        >
          {user?.id !== data.userId && (
            <div>
              <Avatar
                size={32}
                icon={<Image preview={false} src={data.user?.avatar} />}
              />
            </div>
          )}
          <div
            style={{
              maxWidth: "75%",
              wordBreak: "break-word",
            }}
            className={`p-2 rounded ${
              user?.id === data.userId ? "bg-blue-400 " : ""
            } shadow-xl`}
          >
            <div
              style={{
                wordBreak: "break-word",
              }}
            >
              <p className="text-start">{`${data.content}`}</p>
              <p style={{ fontSize: "10px" }} className="text-end">{`${dayjs(
                data.createAt
              ).format("HH:mm")}`}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageComponent;
