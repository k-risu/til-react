import { createContext, useState } from "react";

// 외부에서 context state를 사용하므로
export const UserInfoContext = createContext();
// context 에 지정한 범위로 접근해서,
// context 에 만들어둔 값을 읽거 기능
// context 에 만들어둔 기능을 사용기능 을 위한 공급자(Provider) 생성
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });
  // return {값, 기능 목록 등...}
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {/* 지역범위 */}
      {children}
    </UserInfoContext.Provider>
  );
};
