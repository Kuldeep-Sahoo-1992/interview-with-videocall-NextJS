import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localparticipant = useLocalParticipant();

  const updateInterviewStatus = useMutation(
    api.interviews.updateInterviewStatus
  );

  const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
    streamCallId: call?.id || "",
  });

  if (!call || !interview) {
    return null;
  }

  const isMeetingOwner = localparticipant?.userId === call.state.createdBy?.id;

  if (!isMeetingOwner) {
    return null;
  }

  const endCallHAndler = async () => {
    try {
      await call.endCall();
      await updateInterviewStatus({
        id: interview._id,
        status: "completed",
      });
      router.push("/");
      toast.success("meeting ended for everyone");
    } catch (error) {
      console.log(error);
      toast.error("failed to end the meeting");
    }
  };
  
  return (
    <motion.div>
      <Button onClick={endCallHAndler} variant={"destructive"}>
        End Meeting
      </Button>
    </motion.div>
  );
};

export default EndCallButton;
