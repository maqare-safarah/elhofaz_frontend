import { api } from '@/application-api/http/api-client';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'

interface IProps {
    params: {
        reportDate: string,
    },
    done: () => any,
    canceled: () => any,
}

function TestStageReport(props: IProps) {
    const [values, setValues] = useState({
        date: new Date().toDateString(),
        note: '',
        lessons: [] as number[],
    });
    const [doneStages, setDoneStages] = useState<number[]>([]);
    const [selectedStage, setSelectedStage] = useState<number[]>([]);
    function toggeleSelectedJizu(stage: number) {
        if (!selectedStage.includes(stage)) {
            setSelectedStage([...selectedStage, stage])
        } else {
            setSelectedStage([...selectedStage.filter(p => p != stage)])
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

            <Typography fontWeight="bold" textAlign={'start'} className="w-full">إختر المرحلة:</Typography>
            <Grid container columns={2} mt={1}>
                {Array(10).fill(0).map((value, index) =>
                    <Grid key={index} item xs={1} mb={1} gap={1}>
                        <Stack alignItems={'center'}>
                            <button type="button" onClick={() => { toggeleSelectedJizu(index + 1) }} className={`border rounded-md h-16 w-[90%] ${selectedStage.includes(index + 1) ? "bg-orange-500" : ""}`} >
                                <Typography color={'gray'} fontSize={'0.8em'}>المرحلة {index + 1}</Typography>
                            </button>
                        </Stack>
                    </Grid>
                )}
            </Grid>

            <Typography fontWeight="bold" textAlign={'start'} className="w-full">ملاحظات:</Typography>
            <TextField size='small' multiline rows={4} className='w-full' />

            <Stack mt={2} direction={'row'}>
                <Button onClick={() => { saveReportMutation.mutate(); props.done(); }} disabled={saveReportMutation.isPending} variant="contained" color="primary">حفظ التقرير</Button>
                <Button onClick={props.canceled}>إلغاء</Button>
            </Stack>
        </Stack>
    )
}

export default TestStageReport