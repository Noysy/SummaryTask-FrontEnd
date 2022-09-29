import { Link, List, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const StyledLink = styled(Link)(() => ({
  margin: "1em",
}));

export const StyledTypography = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  marginBottom: 7,
  marginLeft: 2,
  lineHeight: 2,
});

export const StyledList = styled(List)({
  width: 300,
  backgroundColor: "white",
  color: "#444444",
  borderRadius: 1,
});
