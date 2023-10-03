import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { RightFromBracketIcon } from "../icons";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/use-auth";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownEl = useRef(null); // {current: null}
  // useRef เหมือนเป็น hook ตัวนึงที่ประกาศตัวแปรได้ จะมีค่า key = current เช่น const a = useRef(20); // a = {current: 20}
  // useRef เหมือนเป็น memory ของ state
  // Component เปลี่ยนแปลง useRef = ไม่ rerender แต่ state = rerender
  const { logout, authUser } = useAuth(); // authUser = {id, firstName, lastName, profileImage, coverImage}

  // useEffectจะ run ก็ต่อเมื่อ Component ด้านล่างถูกรันแล้ว
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropDownEl.current.contains(e.target)) {
        setIsOpen(false); //ถ้าคลิกตรงไหนในหน้าจอเว็บที่ไม่ใช่กล่อง dropdown = ให้ปิดกล่อง dropdown
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropDownEl}>
      {/* จากเดิม dropDownEl: {current: null} => กลายเป็น {current: object <div class="relative">} */}
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Avatar />
      </div>
      {isOpen && (
        <div className="w-96 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl p-2">
          <Link to="/profile/aaaaaa" onClick={() => setIsOpen(false)}>
            <div className=" flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100">
              <Avatar className="h-14" />
              <div>
                <div className="font-semibold">
                  {authUser.firstName} {authUser.lastName}
                </div>
                <div className="text-sm text-gray-500">See your profile</div>
              </div>
            </div>
          </Link>
          <hr className="m-2 border" />
          <div
            className="flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-xl"
            onClick={logout}
          >
            <div className="bg-gray-300 h-9 aspect-square rounded-full flex justify-center items-center">
              <RightFromBracketIcon />
            </div>
            <div className="font-semibold text-sm">Log out</div>
          </div>
        </div>
      )}
    </div>
  );
}