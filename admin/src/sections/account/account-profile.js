import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage } from '../../redux/slices/authSlice';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

export const AccountProfile = () => {
    const { admin } = useSelector(store => store.auth);
    const [image, setImage] = useState("");
    const user = admin ? admin : [];
    const dispatch = useDispatch();

    // console.log({image});
    const handleFileChange = async (e) => {
        // TODO: Not working
        const file = e.target.files[0];
        // setImage(e.target.files[0]);
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        console.log(formData);

        // await dispatch(updateImage(formData));
        await dispatch(updateImage(formData));
    };
    return (
      <Card>
          <CardContent>
              <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
              >
                  <Avatar
                    src={user?.image}
                    sx={{
                        height: 80,
                        mb: 2,
                        width: 80
                    }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                  >
                      {user?.first_name}{' '}{user?.last_name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                      {user?.about}
                  </Typography>
              </Box>
          </CardContent>
          <Divider/>
          <CardActions>
              <Button
                component={'label'}
                startIcon={<CloudUploadIcon/>}
                fullWidth
                variant="text"
              >
                  Загрузить фото
                  <VisuallyHiddenInput
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                  />
              </Button>
          </CardActions>
      </Card>
    );
};
