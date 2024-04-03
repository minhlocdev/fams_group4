import SettingsInputAntennaOutlinedIcon from "@mui/icons-material/SettingsInputAntennaOutlined";
import SpellcheckOutlinedIcon from "@mui/icons-material/SpellcheckOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { PanToolOutlined } from "@mui/icons-material";
export const DeliveryTypeEnums = {
  1: { type: "Assignment/Lab", icon: <AssignmentIcon /> },
  2: { type: "Concept/Lecture", icon: <RecordVoiceOverIcon /> },
  3: { type: "Guide/Review", icon: <PanToolOutlined /> },
  4: { type: "Test/Quiz", icon: <FactCheckOutlinedIcon /> },
  5: { type: "Exam", icon: <SpellcheckOutlinedIcon /> },
  6: { type: "Seminar/Workshop", icon: <SettingsInputAntennaOutlinedIcon /> },
};
