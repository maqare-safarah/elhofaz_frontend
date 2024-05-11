import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface IProps {
    done: () => any,
    canceled: () => any,
}

function ReviewOldJizuReport(props: IProps) {
    const [values, setValues] = useState({
        date: new Date().toDateString(),
        note: '',
        lessons: [] as number[],
    });

    const [selectedHizb, setSelectedHizb] = useState<number[]>([]);
    function toggeleSelectedHizb(hizb: number) {
        if (!selectedHizb.includes(hizb)) {
            setSelectedHizb([...selectedHizb, hizb])
        } else {
            setSelectedHizb([...selectedHizb.filter(p => p != hizb)])
        }
    }

    return (
        <Stack alignItems={'center'}>
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">التاريخ:</Typography>
            <TextField size='small' disabled className='w-full' value={values.date} />

            <Typography fontWeight="bold" textAlign={'start'} className="w-full">إختر الاحزاب:</Typography>
            <Grid container columns={5} mt={1}>
                {Array(30).fill(0).map((value, index) =>
                    <Grid key={index} item xs={1} mb={1} gap={1}>
                        <Stack alignItems={'center'}>
                            <button type="button" onClick={() => { toggeleSelectedHizb(index * 2 + 1) }} className={`border rounded-t-md rounded-b-none w-[90%] ${selectedHizb.includes(index * 2 + 1) ? "bg-orange-500" : ""}`} >=</button>
                            <button type="button" onClick={() => { toggeleSelectedHizb(index * 2 + 2) }} className={`border rounded-t-none rounded-b-md w-[90%] ${selectedHizb.includes(index * 2 + 2) ? "bg-orange-500" : ""}`} >=</button>
                            <Typography color={'gray'} fontSize={'0.8em'}>جزء {index + 1}</Typography>
                        </Stack>
                    </Grid>
                )}
            </Grid>
            
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">ملاحظات:</Typography>
            <TextField size='small' multiline rows={4} className='w-full' />

            <Stack mt={2} direction={'row'}>
                <Button variant="contained" color="primary">حفظ التقرير</Button>
                <Button onClick={props.canceled}>إلغاء</Button>
            </Stack>
        </Stack>
    )
}

export default ReviewOldJizuReport