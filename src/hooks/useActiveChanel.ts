import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import usePusher, { PusherState } from "./usePusher";
import { Channel } from "pusher-js";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  const pusherClient = usePusher((state: PusherState) => state.pusherClient);

  useEffect(() => {
    if (!pusherClient) return;
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-agora");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: any) => {});

    channel.bind("pusher:subscription_error", (error: any) => {
      console.log("subcription:::error", error);
    });

    channel.bind("pusher:member_added", (member: any) => {
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: any) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-agora");
        pusherClient.unbind("pusher:subscription_succeeded");
        pusherClient.unbind("pusher:subscription_error");
        pusherClient.unbind("pusher:member_added");
        pusherClient.unbind("pusher:member_removed");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, add, pusherClient, remove, set]);
};

export default useActiveChannel;
