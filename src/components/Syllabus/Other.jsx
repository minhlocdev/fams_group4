import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import { Link } from 'react-router-dom';
import TimeAllocation from '../shared/TimeAllocation';
export default function Other() {
    const scheme = {
        Quiz: '15%',
        Assignment: '15%',
        Final: '70%',
        GPA: '70%',
    }
    const trainingPrinciple = [
        "Training",
        "Re-test",
        "Marking",
        "Waiver Criteria",
        "Others"
    ];
    const dataTrainingPrinciple = {
        Training: "Trainee who actively completes online learning according to MOOC links provided.\n" +
            "At the end of the day, students complete Daily Quiz for 30 minutes.\n" +
            "Trainer/Mentor supports answering questions and guiding exercises for 1.5 - 2.0 hours per day.\n" +
            "Trainer conducts the workshops.\n" +
            "Trainees complete Assignments and Labs.\n" +
            "Trainees have 1 final test in 4 hours (1 hour theory + 3 hours of practice).",
        "Re-test": "Only allow each student to retake the test up to 2 times.\n" +
            "Re-exam has the same structure as the Final Test.",
        Marking: "",
        "Waiver Criteria": "Students pass the quick test\nTrainer Audit: rank B",
        Others: "Trainers can allow students to complete homework and submit the next day"
    };
    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4} sx={{ mb: 2 }}>
                <Grid item xs={5.5}>
                    <Card>
                        <Stack
                            sx={{
                                backgroundColor: '#2D3748',
                                pt: 1,
                                pb: 0.5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant="h6" color="white">
                                Time allocation
                            </Typography>
                        </Stack>
                        <CardContent>
                            <Box sx={{ height: '209px', margin: '35px 0px 20px 0px' }}>
                                <TimeAllocation control />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6.2}>
                    <Card>
                        <Stack
                            sx={{
                                backgroundColor: '#2D3748',
                                pt: 1,
                                pb: 0.5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant="h6" color="white">
                                Assessment scheme
                            </Typography>
                        </Stack>
                        <CardContent sx={{ justifyContent: 'center', display: 'flex' }}>
                            <Card variant="outlined" sx={{ border: 2, borderColor: '#8B8B8B', height: '30%', width: '90%' }}>
                                <CardContent sx={{ ml: 2, }}>
                                    <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Stack direction='row' spacing={2}>
                                            <span>Quiz</span>
                                            <Typography variant="body1" sx={{ fontStyle: 'italic' }} gutterBottom>
                                                {scheme.Quiz}
                                            </Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={2} sx={{ mr: 10 }}>
                                            <span>Assignment</span>
                                            <Typography variant="body1" sx={{ fontStyle: 'italic' }} gutterBottom>
                                                {scheme.Assignment}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack direction='row' spacing={2} sx={{ mt: 5 }}>
                                        <span>Final</span>
                                        <Typography variant="body1" sx={{ fontStyle: 'italic' }} gutterBottom>
                                            {scheme.Final}
                                        </Typography>
                                    </Stack>

                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardContent sx={{ justifyContent: 'center', display: 'flex', pt: 1 }}>
                            <Card variant="outlined" sx={{ border: 2, borderColor: '#8B8B8B', height: '30%', width: '90%' }}>
                                <CardContent sx={{ ml: 2, }}>
                                    Passing criteria
                                    <Stack direction='row' spacing={2} sx={{ mt: 5 }}>
                                        <span>GPA*</span>
                                        <Typography variant="body1" sx={{ fontStyle: 'italic' }} gutterBottom>
                                            {scheme.GPA}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
            <Grid container spacing={4} >
                <Grid item xs={11.7}>
                    <Stack>
                        <Card>
                            <Stack
                                sx={{
                                    backgroundColor: '#2D3748',
                                    pt: 1,
                                    pb: 0.5,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h6" color="white">
                                    Training delivery principle
                                </Typography>
                            </Stack>

                            <CardContent>
                                <Stack spacing={3}>
                                    {trainingPrinciple.map((principle, index) => (
                                        <Grid container spacing={4} key={principle}>
                                            <Grid item xs={2}>
                                                <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                                                    <GppGoodOutlinedIcon />
                                                    <span>{principle}</span>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Stack spacing={1.5} sx={{ mt: 1.5, ml: 1 }}>
                                                    {dataTrainingPrinciple[principle]?.split('\n').map((line, index) => (
                                                        <div key={index}>
                                                            {line}
                                                        </div>
                                                    ))}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Box >
    )
}
