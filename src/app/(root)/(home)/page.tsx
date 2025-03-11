"use client";
import useUserRole from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QUICK_ACTIONS } from "@/constants";
import { useState } from "react";
import ActionCard from "@/components/ActionCard";
import MeetingModal from "@/components/MeetingModal";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import LoaderUI from "@/components/LoaderUI";

export default function Home() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const { isInterviewer, user, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };
  if (isLoading)
    return (
      <>
        <LoaderUI />
      </>
    );
  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* WELCOME SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-xl bg-card p-8 border shadow-lg mb-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          Welcome back
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
            {" " + user?.fullName}!
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-lg text-muted-foreground mt-2"
        >
          {isInterviewer
            ? "Manage your interviews and review candidates effectively."
            : "Access your upcoming interviews and preparations."}
        </motion.p>
      </motion.div>
      {isInterviewer ? (
        <>
          {/* Quick Actions */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }, // Delay each card
              },
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {QUICK_ACTIONS.map((action, index) => (
              <motion.div
                key={action.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ActionCard
                  action={action}
                  onClick={() => handleQuickAction(action.title)}
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Meeting Modal */}
          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold">Your Interviews</h1>
            <p className="text-muted-foreground mt-1">
              View and join your scheduled interviews
            </p>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <>
                    {/* <MeetingCard key={interview._id} interview={interview} /> */}
                  </>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
