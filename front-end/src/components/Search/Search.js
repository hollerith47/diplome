import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme, bgColor }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: bgColor ? bgColor : alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

export default Search;
