import { Button, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

interface IProps {
    done: () => any,
    canceled: () => any,
}

function ReviewPrevJizuReport(props: IProps) {
    const [selectedJizu, setSelectedJizu] = useState<number[]>([]);
    function toggeleSelectedJizu(jizu: number) {
      if (!selectedJizu.includes(jizu)) {
        setSelectedJizu([...selectedJizu, jizu])
      } else {
        setSelectedJizu([...selectedJizu.filter(p => p != jizu)])
      }
    }

    return (
        <Stack alignItems={'center'}>
        <Typography fontWeight="bold" textAlign={'start'} className="w-full">إختر الجزء:</Typography>
        <Grid container columns={5} mt={1}>
          {Array(30).fill(0).map((value, index) =>
            <Grid item xs={1} mb={1} gap={1}>
              <Stack alignItems={'center'}>
                <button type="button" onClick={() => { toggeleSelectedJizu(index + 1) }} className={`border rounded-md h-16 w-[90%] ${selectedJizu.includes(index + 1) ? "bg-orange-500" : ""}`} >=</button>
                <Typography color={'gray'} fontSize={'0.8em'}>جزء {index + 1}</Typography>
              </Stack>
            </Grid>
          )}
        </Grid>
        <Stack mt={2} direction={'row'}>
          <Button variant="contained" color="primary">حفظ التقرير</Button>
          <Button onClick={props.canceled}>إلغاء</Button>
        </Stack>
      </Stack>
    )
}

export default ReviewPrevJizuReport