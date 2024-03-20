import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <Image
      src={"/apple-touch-icon.png"}
      width={50}
      height={50}
      alt={"logo"}
    />
  );
};
