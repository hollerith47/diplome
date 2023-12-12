import React, {useState} from 'react';
import {Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack} from "@mui/material";
import Logo from "../../assets/Images/logo.ico";
import {Nav_Buttons, Profile_Menu} from "../../data";
import {Gear} from "phosphor-react";
import AntSwitch from "../../components/AntSwitch";
import {faker} from "@faker-js/faker";
import {useTheme} from "@mui/material/styles";
import useSettings from "../../hooks/useSettings";
import {useNavigate} from "react-router-dom";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/settings";
    default:
      break;
  }
}

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      // TODO: Logout implementation
      return "/auth/login";
    default:
      break;
  }
}

const SideBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // console.log(theme)
  const [selected, setSelected] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // navigate("/profile");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {onToggleMode} = useSettings();

  return (
    <>
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.palette.primary.shadow,
          height: "100vh",
          width: 100
        }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{width: "100%", height: "100%"}}
        >
          <Stack alignItems={"center"} spacing={4}>
            <Box
              p={1}
              sx={{
                backgroundColor: theme.palette.primary.lighter,
                height: 64,
                width: 64,
                borderRadius: 1.5,
              }}
            >
              <img src={Logo} alt="Logo"/>
            </Box>
            <Stack
              spacing={3}
              direction="column"
              alignItems="center"
              sx={{width: "max-content"}}
            >
              {Nav_Buttons.map((item) => (
                item.index === selected ?
                  <Box key={item.index} sx={{backgroundColor: theme.palette.primary.main, borderRadius: 1.5}}>
                    <IconButton
                      onClick={() => navigate(getPath(item.index))}
                      sx={{width: "max-content", color: "#fff"}}>{item.icon}</IconButton>
                  </Box>
                  :
                  <IconButton
                    onClick={() => {
                      setSelected(item.index);
                      navigate(getPath(item.index));
                    }}
                    sx={{width: "max-content"}} key={item.index}
                  >
                    {item.icon}
                  </IconButton>
              ))}
              <Divider sx={{width: "48px"}}/>
              {
                selected === 3 ?
                  <Box sx={{backgroundColor: theme.palette.primary.main, borderRadius: 1.5}}>
                    <IconButton
                      sx={{width: "max-content", color: "#fff"}}
                      onClick={() => {
                        setSelected(3)
                        navigate(getPath(3))
                      }}
                    >
                      <Gear/>
                    </IconButton>
                  </Box>
                  :
                  <IconButton
                    onClick={() => {
                      setSelected(3)
                      navigate(getPath(3))
                    }
                    }
                  >
                    <Gear/>
                  </IconButton>
              }

            </Stack>
          </Stack>
          <Stack
            direction={"column"}
            spacing={4}
          >
            <AntSwitch
              onChange={() => onToggleMode()}
            />
            <Avatar
              id="profile-options"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              src={faker.image.avatar()}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'profile-options',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
            >
              <Stack spacing={1} px={1}>
                {Profile_Menu.map((item, index) => (
                  <MenuItem onClick={()=>{
                    handleClose();
                    navigate(getMenuPath(index))
                  }}>
                    <Stack
                      direction={"row"} sx={{width: 100}}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <span>{item.title}</span>
                      {item.icon}
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Menu>
          </Stack>
        </Stack>
      </Box>

    </>
  );
};

export default SideBar;
