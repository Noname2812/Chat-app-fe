import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "antd";
import React from "react";
import { toast } from "react-toastify";
const ButtonLoginWithGoogle = ({ handleSubmitLogin }) => {
  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const data = await res.json();
        await handleSubmitLogin(
          {
            name: data.name,
            email: data.email,
            image: data.picture,
          },
          "login-with-google"
        );
      } catch (error) {
        toast.error(error);
      }
    },
  });
  return (
    <div className="flex gap-2">
      <Button
        icon={<FontAwesomeIcon icon={faGoogle} color="red" />}
        onClick={() => handleLoginWithGoogle()}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default ButtonLoginWithGoogle;
