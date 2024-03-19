import { useEffect, useRef } from "react";
import { InfoTooltip } from "./CustomMUI";
import { Info } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

export default function ContentEditable(props) {
  const contentEditableRef = useRef(null);
  const handleInput = (event) => {
    const trimmedText = event.target.textContent.trim();
    if (trimmedText !== "") {
      props.onChange(trimmedText);
    } else contentEditableRef.current.focus();
  };

  const handleBlur = () => {
    const trimmedText = contentEditableRef.current.textContent.trim();
    contentEditableRef.current.textContent = trimmedText;
    props.onChange(trimmedText);
  };
  useEffect(() => {
    if (contentEditableRef.current.textContent !== props.value) {
      contentEditableRef.current.textContent = props.value;
    }
  }, [props.value]);

  return (
    <Stack direction={"row"} spacing={1}>
      <div
        style={{
          minWidth: "100px",
          width: "fit-content",
          border: props.value === "" && "1px solid #fff",
          borderRadius: "5px",
        }}
        contentEditable="true"
        suppressContentEditableWarning="true"
        ref={contentEditableRef}
        onInput={handleInput}
        onBlur={handleBlur}
      />
      <InfoTooltip
        title={<Typography variant="span">{props.tooltipTitle}</Typography>}
      >
        <Info color="#fff" fontSize="5px" sx={{ cursor: "pointer" }} />
      </InfoTooltip>
    </Stack>
  );
}
