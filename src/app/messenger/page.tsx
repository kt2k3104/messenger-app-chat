"use client";

import useUserInfo from "~/hooks/useUserInfo";

const Messenger = () => {
  const basicUserInfo = useUserInfo((state) => state.basicUserInfo);
  const friends = useUserInfo((state) => state.friends);

  return <div>Messenger</div>;
};
export default Messenger;
