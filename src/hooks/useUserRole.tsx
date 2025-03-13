import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const useUserRole = () => {
  const { user } = useUser();
  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "",
  });

  return {
    isLoading: userData === undefined,
    isInterviewer: userData?.role === "interviewer",
    isCandidate: userData?.role === "candidate",
    user,
  };
};

export default useUserRole;
