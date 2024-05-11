import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface IProps {
    done: () => any,
    canceled: () => any,
}

function PermissionReport(props: IProps) {
    const [values, setValues] = useState({
        date: new Date().toDateString(),
        reason: '',
        note: '',
    });
    const executeSave = async () => {

    }
    return (
        <Stack alignItems={'center'}>
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">التاريخ:</Typography>
            <TextField size='small' disabled className='' value={values.date} />
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">سبب الغياب:</Typography>
            <TextField size='small' select className='w-full' value={values.reason} onChange={(e) => { setValues({ ...values, reason: e.target.value }) }}>
                <MenuItem value={10}>مرض</MenuItem>
                <MenuItem value={20}>امتحانات</MenuItem>
                <MenuItem value={30}>سفر</MenuItem>
            </TextField>
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">ملاحظات:</Typography>
            <TextField size='small' multiline rows={3} className='w-full' value={values.note} onChange={(e) => { setValues({ ...values, note: e.target.value }) }} />
            <Stack mt={2} direction={'row'}>
                <Button variant="contained" color="primary">حفظ</Button>
                <Button onClick={props.canceled}>إلغاء</Button>
            </Stack>
        </Stack>
    )
}

export default PermissionReport