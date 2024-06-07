import { api } from '@/application-api/http/api-client';
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'

interface IProps {
    params: {
        reportDate: string,
    },
    done: () => any,
    canceled: () => any,
}

function RepeatNormalReport(props: IProps) {
    const [values, setValues] = useState({
        date: new Date().toDateString(),
        note: '',
        jizus: [] as number[],
    });
    const [selectedJizu, setSelectedJizu] = useState<number[]>([]);
    function toggeleSelectedJizu(jizu: number) {
        if (!selectedJizu.includes(jizu)) {
            setSelectedJizu([...selectedJizu, jizu])
        } else {
            setSelectedJizu([...selectedJizu.filter(p => p != jizu)])
        }
    }

    const saveReportMutation = useMutation({
        mutationKey: ['save-report'],
        mutationFn: async () => {
            try {
                await api.post('user/save_report', {
                    "type": "daily",
                    "reported_at": props.params.reportDate,
                    "day": "-",
                })
            } catch (err) {
                alert('هناك خطأ ما')
            }
        }
    })
    return (
        <Stack alignItems={'center'}>
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">التاريخ:</Typography>
            <TextField size='small' disabled className='w-full' value={props.params.reportDate} />

            <Typography fontWeight="bold" textAlign={'start'} className="w-full">إختر الجزء:</Typography>
            <Grid container columns={5} mt={1}>
                {Array(30).fill(0).map((value, index) =>
                    <Grid key={index} item xs={1} mb={1} gap={1}>
                        <Stack alignItems={'center'}>
                            <button type="button" onClick={() => { toggeleSelectedJizu(index + 1) }} className={`border rounded-md h-16 w-[90%] ${selectedJizu.includes(index + 1) ? "bg-orange-500" : ""}`} >
                                <Typography color={'gray'} fontSize={'0.8em'}>جزء {index + 1}</Typography>
                            </button>
                        </Stack>
                    </Grid>
                )}
            </Grid>

            <FormControl className='w-full'>
                <Typography fontWeight="bold" textAlign={'start'} className="w-full">عدد مرات التكرار:</Typography>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <Stack direction='row'>
                        <FormControlLabel value={4} control={<Radio />} label="4" />
                        <FormControlLabel value={5} control={<Radio />} label="5" />
                        <FormControlLabel value={6} control={<Radio />} label="6" />
                    </Stack>
                </RadioGroup>
            </FormControl>

            <Typography fontWeight="bold" textAlign={'start'} className="w-full">ملاحظات:</Typography>
            <TextField size='small' multiline rows={4} className='w-full' />

            <Stack mt={2} direction={'row'}>
                <Button onClick={() => { saveReportMutation.mutate(); props.done(); }} disabled={saveReportMutation.isPending} variant="contained" color="primary">حفظ التقرير</Button>
                <Button onClick={props.canceled}>إلغاء</Button>
            </Stack>
        </Stack>
    )
}

export default RepeatNormalReport