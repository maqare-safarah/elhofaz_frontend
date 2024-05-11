import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface IProps {
    done: () => any,
    canceled: () => any,
}

function StageTestReport(props: IProps) {
    const [doneLessons, setDoneLessons] = useState<number[]>([]);
    const [values, setValues] = useState({
        date: new Date().toDateString(),
        note: '',
        lessons: [] as number[],
    });
    
    function toggeleLesson(lesson: number) {
        if (!values.lessons.includes(lesson)) {
            setValues({ ...values, lessons: [...values.lessons, lesson] })
        } else {
            setValues({ ...values, lessons: values.lessons.filter(p => p != lesson) })
        }
    }

    const executeSave = async () => {

    }

    return (
        <Stack alignItems={'center'}>
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">التاريخ:</Typography>
            <TextField size='small' disabled className='w-full' value={values.date} />

            <Typography fontWeight="bold" textAlign={'start'} className="w-full">اختر الدرس:</Typography>
            <Grid container columns={3} mt={1}>
                {Array(20).fill(0).map((value, index) =>
                    <Grid key={index} item xs={1} mb={1} gap={1}>
                        <Stack alignItems={'center'}>
                            <button type="button" onClick={() => { toggeleLesson(index + 1) }} className={`border rounded-md h-16 w-[90%] ${values.lessons.includes(index + 1) ? "bg-orange-500" : ""}`} >
                                <Typography color={'gray'} fontSize={'0.8em'}>تجويد {index + 1}</Typography>
                            </button>
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

export default StageTestReport