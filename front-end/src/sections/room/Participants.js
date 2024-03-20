import {Box, Divider, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const LIST = [
    {
        id: 1,
        identity: "Herman",
    },
    {
        id: 2,
        identity: "Makiese",
    },
    {
        id: 3,
        identity: "John Doe",
    },
    {
        id: 4,
        identity: "Herman",
    },
]
const Participants = () => {
    const theme = useTheme();
    return (
        <Box sx={{
            p: 2,
            width:320,
            display: 'flex',
            textAlign: 'left',
            flexDirection: "column",
            borderRight: `1px solid ${theme.palette.divider}`,
            borderLeft: `1px solid ${theme.palette.divider}`
        }}>
            <Box sx={{
                p:2,
                display: 'flex',
                flexDirection: "column",
                rowGap: 2,
            }}>
                <Typography variant="subtitle1" sx={{color: "text.secondary"}}>Participants Box</Typography>
                <Stack>
                    {LIST.map(({id, identity})=>(
                        <Stack key={id} spacing={0.5} justifyContent="center">
                            <Box sx={{
                                px:3,
                                py:1,
                                borderRadius:2,
                                '&:hover': {
                                    backgroundColor: theme.palette.grey[200],
                                }
                            }}>
                                <Typography variant="subtitle2" sx={{color: "#676767"}}>
                                    {identity}
                                </Typography>
                            </Box>
                            <Divider />
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default Participants;
