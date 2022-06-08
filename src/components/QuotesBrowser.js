
import { Box, IconButton, Typography, CircularProgress,LinearProgress  } from "@mui/material"
import { ArrowBack,Pause , PlayArrow,  ArrowForward } from "@mui/icons-material"
import React, { useState, useEffect } from 'react';
import { getRandomQuote } from "services/quotes.service";

/**
 * A Single Quote
 */
function Quote(props) {
    if (props.content) {
        return (
            <Box
            component="div"
            alignItems="center"
            display="flex"
            flexDirection="column"
            >
                <Typography variant="h5">
                    {props.content.author}
                </Typography>
                <Typography variant="h2">
                    {props.content.text}
                </Typography>
            </Box>
        )
    } 
    return (
        <CircularProgress/>
    )
}

/**
 * Either a Pause or a Resume Button
 */
function PauseResume(props) {

    if (!props.pauseRequest) {
        return (
            <IconButton aria-label="pause" size="large" onClick={props.onPause}>
                <Pause fontSize="large"/>
            </IconButton>
        )
    }

    return (
        <IconButton aria-label="resume" size="large" onClick={props.onResume}>
            <PlayArrow fontSize="large"/>
        </IconButton>
    )

}

/**
 * Contains the different control buttons
 */
function ControlButtons(props) {
    return (
    <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <IconButton aria-label="previous" size="large" onClick={props.onPrevious} disabled={props.current === 0}>
            <ArrowBack fontSize="large"/>
        </IconButton>


        <PauseResume pauseRequest={props.pauseRequest} onPause={props.onPause} onResume={props.onResume}/>

        <IconButton aria-label="next" size="large" onClick={props.onNext} disabled={!props.currentValue}>
            <ArrowForward fontSize="large"/>
        </IconButton>
    </Box>
)
}

/**
 * General Container of Main logic
 */
export default function QuotesBrowser() {
    const [progress, setProgress] = useState(1);
    const [currentQuote, setCurrentQuote] = useState(0);
    const [changeRequest, setChangeRequest] = useState(false);
    const [pauseRequest, setPauseRequest] = useState(false);
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        /*
         * value of progress "0" is preserved to "natural" change ( without the user skipping/going back)
         * Changes ( Next / Previous ) that are done manually by the user get the value of progress "1" ( in order to not trigger the change on "0" for the setInterval)
         */
        const timer = setInterval(() => {
            if (progress === 0) { 
                setCurrentQuote(currentQuote +1);
            }

            if (!pauseRequest) { // user isn't pausing, increment the timer.
                if (quotes.length > currentQuote) { // quote exists, otherwise wait for it to load.
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
                }
            }
        }, 75);
        return() => {
            clearInterval(timer);
        }
    }, [progress, quotes, currentQuote, pauseRequest, changeRequest]);

    useEffect(() => {
        if (!quotes[currentQuote]) {
            getRandomQuote().then((quote) => {
              setQuotes(quotes.concat(quote));
            })
        }      
    }, [currentQuote]);
    
    useEffect(() => {
        if (changeRequest) { // A user asked to go to the previous/next quote
            setProgress(1);
            setChangeRequest(false);
        }
    }, [changeRequest])

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
                <Quote content={quotes[currentQuote]}/>
            </Box>

            <ControlButtons 
                pauseRequest={pauseRequest}
                current={currentQuote}
                currentValue={quotes[currentQuote]}
                onPrevious={() => {
                    setChangeRequest(true);
                    if (currentQuote > 0) setCurrentQuote(currentQuote - 1)

                }} 
                onPause={() => { setPauseRequest(true)}}
                onResume={() => { setPauseRequest(false)}} 
                onNext={() => { 
                    setChangeRequest(true);
                    setCurrentQuote(currentQuote + 1)
                }}
            />

        </Box>
    )
}