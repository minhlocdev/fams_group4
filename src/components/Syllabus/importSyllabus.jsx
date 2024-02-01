import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Link, MenuItem, Radio, RadioGroup, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import ModalContainer from '../shared/ModalContainer';

const style = {
    py: 0,
    width: '100%',
    borderColor: 'divider',

};



export function ImportSyllabus({ isOpen }) {
    return (
        <ModalContainer title={"Import Syllabus"} >
            <Box sx={style}>
                <Grid container sx={{ paddingRight: 4, paddingLeft: 4 }}>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: 'bold' }}>Import setting</Typography>
                    </Grid>
                    <Grid item xs={8}  >
                        < Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                            <Stack spacing={2}>
                                <Typography>File (csv)*</Typography>
                                <Typography>Encoding type</Typography>
                                <Typography>Column seperator</Typography>
                                <Typography>Import template</Typography>
                            </Stack>
                            <Stack spacing={2}>
                                <Button sx={{
                                    background: '#2D3748',
                                    height: 22,
                                    maxWidth: 80
                                }} variant="contained" size="small">
                                    Select
                                </Button>
                                <Select
                                    sx={{
                                        height: 22, maxWidth: 300, minWidth: 150
                                    }}
                                    defaultValue={"Auto detect"}
                                >
                                    <MenuItem value={"Auto detect"}>Auto detect</MenuItem>
                                </Select>
                                <Select
                                    sx={{ height: 22 }}
                                    defaultValue={"Comma"}
                                >
                                    <MenuItem value={"Comma"}>Comma</MenuItem>
                                </Select>
                                <Link href="#">Download</Link>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>


                <Divider sx={{ background: '#ACACAC', marginTop: 3, marginBottom: 3 }} variant="middle" component="li" />


                <Grid container sx={{ paddingRight: 4, paddingLeft: 4 }}>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: 'bold' }} >Duplicate control</Typography>
                    </Grid>
                    <Grid item xs={8}  >
                        <Box >
                            <Box>
                                <Typography>Scanning</Typography>
                                <FormGroup sx={{
                                    display: 'flex', justifyContent: 'space-between', flexDirection: 'row'
                                }}>
                                    < FormControlLabel control={< Checkbox sx={{
                                        '&.Mui-checked': {
                                            color: '#2D3748',
                                        }
                                    }} defaultChecked />} label="Syllabus code" />
                                    <FormControlLabel control={<Checkbox sx={{
                                        '&.Mui-checked': {
                                            color: '#2D3748',
                                        }
                                    }} />} label="Syllabus name" />
                                </FormGroup>
                            </Box>
                            <Box>
                                <Typography>Duplicate handle</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Allow" control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: '#2D3748',
                                        }
                                    }} />} label="Allow" />
                                    <FormControlLabel value="Replace" control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: '#2D3748',
                                        }
                                    }} />} label="Replace" />
                                    <FormControlLabel value="Skip" control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: '#2D3748',
                                        }
                                    }} />} label="Skip" />

                                </RadioGroup>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ background: '#ACACAC', marginTop: 3, marginBottom: 3 }} variant="middle" component="li" />

                <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', marginRight: 5 }}>
                    <Button variant="text" sx={{ color: '#E74A3B', textDecoration: 'underline', maxHeight: 27 }}>Cancel</Button>
                    <Button variant="contained" sx={{ maxHeight: 27, background: '#2D3748' }}>Import</Button>

                </Stack >
            </Box>
        </ModalContainer >


    )
}
