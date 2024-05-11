import { QuranJizus } from '@/lib/quran-models';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface IProps {
    done: () => any,
    canceled: () => any,
}

function ReviewJizuReport(props: IProps) {
    const [values, setValues] = useState({
      date: new Date().toDateString(),
      note: '',
      lessons: [] as number[],
    });

    const [currentJizu, setCurrentJizu] = React.useState(15);
    const [donePages, setDonePages] = React.useState<string[]>([]);

    function toggeleSelectedPage(page: string) {
        if (!selectedPages.includes(page)) {
            setSelectedPages([...selectedPages, page])
        } else {
            setSelectedPages([...selectedPages.filter(p => p != page)])
        }
    }

    const [selectedPages, setSelectedPages] = React.useState<string[]>([]);

    return (
        <Stack alignItems={'center'}>
            <Typography fontWeight="bold" textAlign={'start'} className="w-full">التاريخ:</Typography>
            <TextField size='small' disabled className='w-full' value={values.date} />

            <Typography fontWeight="bold" textAlign={'start'} className="w-full">إختر الاوجه:</Typography>
            <Stack direction={'row'} justifyContent={'space-between'} className="w-full" mt={1}>
                <Button variant="outlined" size="small" color="primary" onClick={() => {
                    if (currentJizu > 1) setCurrentJizu(currentJizu - 1)
                }}><ChevronRightIcon /></Button>
                <Box>الجزء {currentJizu}</Box>
                <Button variant="outlined" size="small" color="primary" onClick={() => {
                    if (currentJizu < 30) setCurrentJizu(currentJizu + 1)
                }}><ChevronLeftIcon /></Button>
            </Stack>

            <Grid container columns={5} mt={1}>
                {QuranJizus[currentJizu] && Array((QuranJizus[currentJizu].endPage || 0) - (QuranJizus[currentJizu].page || 0) + 1).fill(0).map((value, index) =>
                    <Grid item xs={1} mb={1} gap={1}>
                        <Stack alignItems={'center'}>
                            {donePages.includes(index + (QuranJizus[currentJizu].page || 0) + "/1") && <button type="button" className={`border rounded-t-md rounded-b-none w-[90%] bg-lime-500`} >=</button>}
                            {!donePages.includes(index + (QuranJizus[currentJizu].page || 0) + "/1") && <button type="button" onClick={() => { toggeleSelectedPage(index + (QuranJizus[currentJizu].page || 0) + "/1") }} className={`border rounded-t-md rounded-b-none w-[90%] ${selectedPages.includes(index + (QuranJizus[currentJizu].page || 0) + "/1") ? "bg-orange-500" : ""}`} >=</button>}
                            {donePages.includes(index + (QuranJizus[currentJizu].page || 0) + "/2") && <button type="button" className={`border rounded-t-none rounded-b-md w-[90%] bg-lime-500`} >=</button>}
                            {!donePages.includes(index + (QuranJizus[currentJizu].page || 0) + "/2") && <button type="button" onClick={() => { toggeleSelectedPage(index + (QuranJizus[currentJizu].page || 0) + "/2") }} className={`border rounded-t-none rounded-b-md w-[90%] ${selectedPages.includes(index + (QuranJizus[currentJizu].page || 0) + "/2") ? "bg-orange-500" : ""}`} >=</button>}
                            <Typography color={'gray'} fontSize={'0.8em'}>ص {index + (QuranJizus[currentJizu].page || 0)}</Typography>
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

export default ReviewJizuReport