"use client";

import { useEffect } from "react";
import requestApi from "~/utils/api";

interface IParams {
  conversationId: string;
}

const ConversationBody = ({ params }: { params: IParams }) => {
  useEffect(() => {
    const callApi = async () => {
      const response = await requestApi(
        `conversation/${params.conversationId}`,
        "GET",
        null
      );
      console.log(response);
    };
    callApi();
  });

  return <div>tin nhan</div>;
};

export default ConversationBody;
