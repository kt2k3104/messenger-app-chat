"use client";
// const MessengerPage = () => {
//   return <div>in nhan</div>;
// };

// export default MessengerPage;
import { useEffect, useRef } from "react";

function ChatBox() {
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const chatBox: any = chatBoxRef.current;
    const handleScroll = () => {
      if (chatBox.scrollTop + chatBox.clientHeight === chatBox.scrollHeight) {
        console.log(
          chatBox.scrollTop,
          chatBox.clientHeight,
          chatBox.scrollHeight
        );
        console.log("You have reached the bottom of the chat box!");
      }

      // if (chatBox.scrollTop === 0) {
      //   console.log("hehehe");
      // }
    };
    chatBox.addEventListener("scroll", handleScroll);
    return () => chatBox.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={chatBoxRef}
      style={{
        height: "200px",
        overflow: "auto",
        border: "1px solid black",
      }}
    >
      <p>Message 1</p>
      <p>Message 2</p>
      <p>Message 3</p>
      <p>Message 4</p>
      <p>Message 5</p>
      <p>Message 6</p>
      <p>Message 7</p>
      <p>Message 8</p>
      <p>Message 9</p>
      <p>Message 10</p>
    </div>
  );
}

export default ChatBox;
