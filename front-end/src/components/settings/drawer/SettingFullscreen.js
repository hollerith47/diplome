// @mui
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
//
import Iconify from '../../Iconify';
import {useDispatch, useSelector} from "react-redux";
import {updateFullScreenState} from "../../../redux/slices/appSlice";

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
  const { fullscreen } = useSelector(store => store.app);
  const dispatch = useDispatch();

  const toggleFullScreen = () => {
      if (!fullscreen) {
          document.documentElement.requestFullscreen();
          dispatch(updateFullScreenState())
      } else {
          document.exitFullscreen();
          dispatch(updateFullScreenState())
      }
  };

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color={fullscreen ? 'primary' : 'inherit'}
      startIcon={<Iconify icon={fullscreen ? 'ic:round-fullscreen-exit' : 'ic:round-fullscreen'} />}
      onClick={toggleFullScreen}
      sx={{
        fontSize: 14,
        ...(fullscreen && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        }),
      }}
    >
      {fullscreen ? 'Выйти из полноэкранного' : 'Полноэкранный'}
    </Button>
  );
}
