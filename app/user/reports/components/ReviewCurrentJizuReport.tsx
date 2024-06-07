import { QuranJizus } from '@/lib/quran-models';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { sortBy, first, last } from 'lodash';
import { getPartsRange, pageSegments, pageValue, nextPart, prevPart, isPageValid } from '@/lib/page.logic';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/application-api/http/api-client';

interface IProps {
    params: {
        reportDate: string,
    },
    done: () => any,
    canceled: () => any,
}

function ReviewCurrentJizuReport(props: IProps) {
    const [values, setValues] = useState({
        date: new Date().toDateString(),
        note: '',
        lessons: [] as number[],
    });

    const [currentJizu, setCurrentJizu] = React.useState(15);
    const [selectedPages, setSelectedPages] = React.useState<string[]>([]);
    const [shouldSelectFirst, setShouldSelectFirst] = React.useState<boolean>(true);
    const [selectedFirstPage, setSelectedFirstPage] = React.useState<string | null>(null);

    function toggeleSelectedPage(page: string) {
        if (!isPageValid(page)) return;

        if (shouldSelectFirst) {
            setSelectedFirstPage(page)
            setShouldSelectFirst(false)
        } else {
            if (!selectedFirstPage || !isPageValid(selectedFirstPage)) return;
            if (pageValue(page) < pageValue(selectedFirstPage)) {
                setSelectedPages(getPartsRange(page, selectedFirstPage))
            } else {
                setSelectedPages(getPartsRange(selectedFirstPage, page))
            }
            setSelectedFirstPage(null)
            setShouldSelectFirst(true)
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
                    "current_from": first(selectedPages),
                    "current_to": last(selectedPages),
                    // "notes": "مراجعة الجزء الحالي",
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
                    <Grid key={index} item xs={1} mb={1} gap={1}>
                        <Stack alignItems={'center'}>
                            <button type="button" onClick={() => { toggeleSelectedPage(index + (QuranJizus[currentJizu].page || 0) + "/1") }} className={`border rounded-t-md rounded-b-none w-[90%] ${selectedPages.includes(index + (QuranJizus[currentJizu].page || 0) + "/1") ? "bg-orange-500" : ""} ${selectedFirstPage == (index + (QuranJizus[currentJizu].page || 0) + "/1") ? "border-1 border-blue-500" : ""}`} >=</button>
                            <button type="button" onClick={() => { toggeleSelectedPage(index + (QuranJizus[currentJizu].page || 0) + "/2") }} className={`border rounded-t-none rounded-b-md w-[90%] ${selectedPages.includes(index + (QuranJizus[currentJizu].page || 0) + "/2") ? "bg-orange-500" : ""} ${selectedFirstPage == (index + (QuranJizus[currentJizu].page || 0) + "/2") ? "border-1 border-blue-500" : ""}`} >=</button>
                            <Typography color={'gray'} fontSize={'0.8em'}>ص {index + (QuranJizus[currentJizu].page || 0)}</Typography>
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

export default ReviewCurrentJizuReport