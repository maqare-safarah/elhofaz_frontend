import { api } from '@/application-api/http/api-client'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'

interface IProps {
    params: {
        reportDate: string,
    },
    done: () => any,
    canceled: () => any,
}

function NoteReport(props: IProps) {
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
            <TextField size='small' disabled className='' value={props.params.reportDate} />
            
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">ملاحظات:</Typography>
            <TextField size='small' multiline rows={4} className='w-full' />
            
            <Stack mt={2} direction={'row'}>
                <Button onClick={() => { saveReportMutation.mutate(); props.done(); }} disabled={saveReportMutation.isPending} variant="contained" color="primary">حفظ التقرير</Button>
                <Button onClick={props.canceled}>إلغاء</Button>
            </Stack>
        </Stack>
    )
}

export default NoteReport