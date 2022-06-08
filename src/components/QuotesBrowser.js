
import { IconButton, Typography } from "@mui/material"
import { ArrowBack,Pause ,ArrowForward } from "@mui/icons-material"
import { Box } from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress';
import React, { useState, useEffect } from 'react';
/**
 * General Container of Main logic
 */
export default function QuotesBrowser() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 75);

        return() => {
            clearInterval(timer);
        }
    })

    return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
            <Box
            component="div"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="75vh"
            >
                <Typography variant="h2">
                    And curate insightful content just for you
                </Typography>
            </Box>

            <Box
                component="div"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                
                <IconButton aria-label="previous" size="large" >
                    <ArrowBack fontSize="large"/>
                </IconButton>
                <IconButton aria-label="pause" size="large" >
                    <Pause fontSize="large"/>
                </IconButton>
                <IconButton aria-label="previous" size="large" >
                    <ArrowForward fontSize="large"/>
                </IconButton>
            </Box>

        </Box>
    )
}