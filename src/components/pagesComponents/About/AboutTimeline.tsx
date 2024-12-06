import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Typography from "@mui/material/Typography";

import { MdFeedback, MdStar, MdStart, MdSyncProblem } from "react-icons/md";
import { PiRocketLaunchDuotone } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";

const AboutTimeline = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-center text-priColor mb-14">
        Our Evolution
      </h2>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            started during COVID-19 pandemic (2020)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <MdStart />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Journey
            </Typography>
            <Typography>From where it start</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            Financial struggles and pivoted business model (2020)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <MdFeedback />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Overcame
            </Typography>
            <Typography>That reached to goal</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            First version of MBooking platform (2021)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <PiRocketLaunchDuotone />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Launched
            </Typography>
            <Typography>Makes batter platform</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            Grew user base significantly through word of mouth and marketing
            (2021)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <FiUsers />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Grew user
            </Typography>
            <Typography>Increasing user</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            Faced and resolved platform scalability issues (2022)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <MdSyncProblem />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Resolved problem
            </Typography>
            <Typography>Resolving problem</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            Achieved market recognition and expanded services globally (2023)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <MdStar />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Achieved
            </Typography>
            <Typography>Achieving recognition & services </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default AboutTimeline;
