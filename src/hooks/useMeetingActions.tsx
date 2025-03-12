import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();

  const createInstantMeetings = async () => {
    if (!client) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Instant Meeting",
          },
        },
      });
      router.push(`/meetings/${call.id}`);
      toast.success("Meeting Created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create meeting. Please try again.");
    }
  };

  const joinMeeting = (callID: string) => {
    if (!client) {
      return toast.error("Faildes to join meeting. Please try again.");
    }
    router.push(`/meeting/${callID}`);
  };

  return { createInstantMeetings, joinMeeting };
};

export default useMeetingActions;
