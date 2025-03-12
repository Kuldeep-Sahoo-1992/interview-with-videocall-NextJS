import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;
    const getCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });
        if (calls.length > 0) {
          // Assuming we only have one call
          setCall(calls[0]);
        }
      } catch (error) {
        console.error("Error fetching call:", error);
        setCall(undefined);
      } finally {
        setIsCallLoading(false);
      }
    };
    getCall();
  }, [client, id]);

  return { call, isCallLoading };
};
export default useGetCallById;
