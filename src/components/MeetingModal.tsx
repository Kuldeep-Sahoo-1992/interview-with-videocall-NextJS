import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useMeetingActions from "@/hooks/useMeetingActions";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  isJoinMeeting,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}) => {
  const [meetingUrl, setMeetingUrl] = useState("");

  const { createInstantMeetings, joinMeeting } = useMeetingActions();

  const handleStart = () => {
    if (isJoinMeeting) {
      const meetingId = meetingUrl.split("/").pop();
      if (meetingId) {
        joinMeeting(meetingId);
      }
    } else {
      createInstantMeetings();
    }
    console.log(meetingUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {isJoinMeeting && (
            <Input
              placeholder="Paste meeting link here..."
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
            />
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoinMeeting && !meetingUrl.trim()}
            >
              {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
