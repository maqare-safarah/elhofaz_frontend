import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface IProps {
    done: () => any,
    canceled: () => any,
}

function NoteReport(props: IProps) {
    const [values, setValues] = useState({
        date: new Date().toDateString(),
        note: '',
    });
    const executeSave = async () => {

    }
    return (
        <Stack alignItems={'center'}>
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">التاريخ:</Typography>
            <TextField size='small' disabled className='' value={values.date} />
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">ملاحظات:</Typography>
            <TextField size='small' multiline rows={4} className='w-full' />
            <Stack mt={2} direction={'row'}>
                <Button variant="contained" color="primary" onClick={executeSave}>حفظ</Button>
                <Button onClick={props.canceled}>إلغاء</Button>
            </Stack>
        </Stack>
    )
}

export default NoteReport