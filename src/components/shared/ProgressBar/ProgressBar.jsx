import * as React from 'react';
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles'

const SliderStyled = styled(Slider)(({ theme }) =>
({
    cursor: 'default',
    height: '12px',
    ".MuiSlider-rail": {
        backgroundColor: 'grey',
        opacity: 0.5
    },
    ".MuiSlider-thumb, .MuiSlider-thumb:hover": {
        width: 10,
        height: 10,
        backgroundColor: 'white',
        cursor: 'default',
        boxShadow: 'none'
    },
    ".MuiSlider-track": {
        border: 'none',
        borderRadius: 'none'
    },
    ".Mui-active": {
        boxShadow: 'none'
    }
})
)
export default function ProgressBar({ index }) {
    const [progress, setProgress] = React.useState(15)
    const [color, setColor] = React.useState('')


    // progress = [15, 40, 66, 90]
    // console.log(index)
    React.useEffect(() => {
        switch (index) {
            case 1:
                setProgress(40)
                setColor("#EDF2F7");
                break;
            case 2:
                setProgress(66)
                setColor("#D45B13");
                break
            case 3:
                setProgress(90)
                setColor("#2F903F");
                break
            default:
                setProgress(15)
                setColor("#2D3748");
                break
        };
    }, [index])

    return (
        <Box sx={{ width: '320px', textAlign: 'center' }}>
            <Box display="grid" columnGap={1} >
                <Box gridColumn="span 8" sx={{ height: '30px' }}>
                    {/* <p>{progress}%</p> */}
                    <SliderStyled aria-label="progress bar"
                        size='small' value={progress}
                        slotProps={{ Thumb: CircleIcon }}
                        sx={{
                            ".MuiSlider-track": {
                                backgroundColor: color,
                            },
                            ".MuiSlider-rail": {
                                backgroundColor: progress >= 90 && '#2F903F',
                                opacity: progress >= 90 && 1
                            }
                        }}
                    />
                </Box>
                <Box gridColumn="span 2">General</Box>
                <Box gridColumn="span 2">Outline</Box>
                <Box gridColumn="span 2">Other</Box>
                <Box gridColumn="span 2">Done</Box>
            </Box>
        </Box>
    )
}
