import { useParams } from "react-router-dom";
import ProfileCover from "../features/profile/ProfileCover";
import ProfileInfo from "../features/profile/ProfileInfo";
import { useEffect, useState } from "react";
import axios from "../config/axios";
// import { useAuth } from "../hooks/use-auth";

export default function ProfilePage() {
  const [profileUser, setProfileUser] = useState({});
  const [statusWithAuthUser, setStatusWithAuthUser] = useState("");
  const { profileId } = useParams();

  // const { authUser } = useAuth(); //ถ้า authUser เปลี่ยน effect fn นี้ก็จะรันอีกรอบหนึ่ง (authUser จะเปลี่ยนตอนที่อัพเดทรูป)

  useEffect(() => {
    axios
      .get(`/user/${profileId}`)
      .then((res) => {
        setProfileUser(res.data.user);
        setStatusWithAuthUser(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profileId]);

  return (
    <div className="bg-gradient-to-b from-gray-200 to-white shadow pb-4">
      {profileUser ? (
        <>
          <ProfileCover coverImage={profileUser?.coverImage} />
          <ProfileInfo
            profileUser={profileUser}
            statusWithAuthUser={statusWithAuthUser}
          />
        </>
      ) : (
        <h1 className="text-center p-8 text-3xl font-bold">
          404 !!! user not found
        </h1>
      )}
    </div>
  );
}
