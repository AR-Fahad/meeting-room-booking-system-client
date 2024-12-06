import Heading from "@/components/heading/Heading";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const steps = [
  {
    label: "Select a room",
    description: `Room that you preferred as your needs. Ex. Capacity, Amenities etc.`,
  },
  {
    label: "Choose date & time",
    description:
      "Choose date & time that suits you best. Without choosing date & time, you can't book a room.",
  },
  {
    label: "Confirm Booking",
    description: `Review your choices and confirm your booking.`,
  },
];

const HowToBook = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div>
      <Heading>Booking Step's</Heading>
      <div className="p-2 mt-5">
        <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "&.Mui-active": {
                        color: "#5059d6", // Color for completed steps
                      },
                      "&.Mui-completed": {
                        color: "#5059d6", // Color for completed steps
                      },
                    },
                  }}
                  optional={
                    index === steps.length - 1 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1, backgroundColor: "#5059d6" }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1, color: "#5059d6" }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button
                onClick={handleReset}
                sx={{ mt: 1, mr: 1, color: "#5059d6" }}
              >
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </div>
    </div>
  );
};

export default HowToBook;
