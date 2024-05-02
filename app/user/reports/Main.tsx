"use client"
import ReportCard from "@/app/components/reportsCard";
import { QuranJizus } from "@/lib/quran-models";
import { Box, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Stack, FormControlLabel, Checkbox, Typography, Divider } from "@mui/material";
import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

let cards = [
  {
    id: 1,
    title: "التقارير المستلمة",
    subtitle: "عدد التقارير للان",
    content: "12",
    btnText: "عرض التقارير",
    btnLink: "/user/reports/report-details",
  },
  {
    id: 2,
    title: "عدد ايام الغياب",
    subtitle: "عدد ايام الغياب للان",
    content: "6",
    btnText: "عرض الغياب",
    btnLink: "/user/reports/absence-details",
  },
  {
    id: 3,
    title: "طلبات التخفيف",
    subtitle: "عدد الطلبات للان",
    content: "3",
    btnText: "عرض الطلبات",
    btnLink: "/user/reports/takhfeef-details",
  },
  {
    id: 4,
    title: "مقدار الحفظ اليومي",
    subtitle: "مقدار الحفظ اليومي",
    content: "4",
    btnText: "تغيير الحفظ",
    btnLink: "/user/reports",
  },
];

const MainPage = () => {
  const [currentJizu, setCurrentJizu] = React.useState(15);
  const [selectedPages, setSelectedPages] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openHafz, setOpenHafz] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addReport(formType: string) {
    handleClose();
    setOpenHafz(true);
  }

  return (
    <div className="#main">

      <p>
        اسم الطالب: مازن عثمان
        <br />
        الحلقة: على ابن ابي طالب
        <br />
        المسار: الضبط - الحافظ الجديد
        <br />
        الاتجاه: من النهاية للبداية
        <br />
        الاتجاه: تنازلى / تصاعدي
        <br />
        الصفحة الحالية: 595
        <br />
        الجزء الحالي: 30
        <br />
        مقدار الحفظ اليومي: نصف وجه
      </p>

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        إضافة تقرير
      </Button>

      {/* كروت معلومات */}
      <Grid container>
        {cards.map((card) => {
          return (
            <Grid key={card.id} item lg={3} md={4} sm={6}>
              <Container>
                <ReportCard
                  title={card.title}
                  subtitle={card.subtitle}
                  content={card.content}
                  btnText={card.btnText}
                  btnLink={card.btnLink}
                />
              </Container>
            </Grid>
          );
        })}
      </Grid>

      {/* اضافة تقرير */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogContent>
          <Stack gap={1}>
            <DialogTitle>اضافة تقرير</DialogTitle>
            <Button variant="contained" color="primary" onClick={() => { addReport("PAGE_HAFZ") }}>حفظ الوجه</Button>
            <Button variant="contained" color="primary" onClick={() => { addReport("PAGE_AARD") }}>عرض الوجه</Button>
            <Button variant="contained" color="primary" onClick={() => { addReport("JIZU_REVIEW") }}>مراجعة الحالي</Button>
            <Button variant="contained" color="primary" onClick={() => { addReport("PREV_JIZU_REVIEW") }}>مراجعة السابق</Button>
            <Button variant="contained" color="primary" onClick={() => { addReport("OLD_JIZU_REVIEW") }}>مراجعة القديم</Button>
            <Button variant="contained" color="primary" onClick={() => { addReport("JIZU_TEST") }}>العرض الاختباري</Button>
            <Button variant="contained" color="primary" onClick={() => { addReport("STAGE_TEST") }}>عرض الاجزاء</Button>
            <Button variant="contained" color="primary" onClick={() => { addReport("NORMAL_REPEAT") }}>التكرار العادي</Button>
            <Button variant="contained" color="primary" onClick={() => { addReport("HEAVY_REPEAT") }}>التكرار المكثفة</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
        </DialogActions>
      </Dialog>

      {/* تقرير حفظ الوجه */}
      <Dialog
        open={openHafz}
        onClose={() => { setOpenHafz(false) }}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries((formData as any).entries());
            // const email = formJson.email;
            // console.log(email);
            // handleClose();
            setOpenHafz(false)
          },
        }}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير حفظ الوجه</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack alignItems={'center'}>
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
                <Grid item xs={1} mb={1}>
                  <Stack alignItems={'center'}>
                    <Button size="small" variant="outlined" color="primary" className="">=</Button>
                    <Button size="small" variant="outlined" color="primary" className="">=</Button>
                    <Typography color={'gray'} fontSize={'0.8em'}>ص {index + (QuranJizus[currentJizu].page || 0)}</Typography>
                  </Stack>
                </Grid>
              )}
            </Grid>
            <Stack mt={2} gap={1} alignItems={'start'}>
              <Typography fontWeight={'bold'}>الاستماع الاول:</Typography>
              <FormControlLabel control={<Checkbox />} label="هل تم الاستماع لأحد المشايخ المعتمدين في البرنامج أو القراءة على شيخ متقن حضورياً؟" />
              <Typography fontWeight={'bold'}>الضبط:</Typography>
              <FormControlLabel control={<Checkbox />} label="ترديد الأوجه من المصحف وعلامة الضبط القراءة غيباً بدون أخطاء وبدون ترددات " />
              <Typography fontWeight={'bold'}>الاستماع الثاني:</Typography>
              <FormControlLabel control={<Checkbox />} label="القراءة من المصحف أو على شيخ متقن حضورياً للتأكد من ضبط الأوجه صحيحاً" />
              <Typography fontWeight={'bold'}>التكرار الاول:</Typography>
              <FormControlLabel control={<Checkbox />} label="التكرار 10 مرات مباشرة بعد الاستماع الثاني" />
              <Typography fontWeight={'bold'}>التكرار الثاني:</Typography>
              <FormControlLabel control={<Checkbox />} label="التكرار 10 مرات متباعدة في الصلوات او أوقات العمل أو أوقات الفراغ" />
              <Divider className="w-full" />
            </Stack>
            <Stack mt={2} direction={'row'}>
              <Button variant="contained" color="primary">حفظ التقرير</Button>
              <Button onClick={() => { setOpenHafz(false) }}>إلغاء</Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainPage;
