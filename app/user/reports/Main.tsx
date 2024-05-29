"use client"
import ReportCard from "@/app/components/reportsCard";
import { QuranJizus, QuranPages, QuranSuras } from "@/lib/quran-models";
import { Box, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Stack, FormControlLabel, Checkbox, Typography, Divider, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDialog } from "@/app/hooks/useDialog";
import TestJizuReport from "./components/TestJizuReport";
import TestStageReport from "./components/TestStageReport";
import RepeatNormalReport from "./components/RepeatNormalReport";
import RepeatHeavyReport from "./components/RepeatHeavyReport";
import TajweedLessonReport from "./components/TajweedLessonReport";
import PermissionReport from "./components/PermissionReport";
import NoteReport from "./components/NoteReport";
import ReviewOldJizuReport from "./components/ReviewOldJizuReport";
import PrevJizuReviewReport from "./components/ReviewPrevJizuReport";
import ReviewJizuReport from "./components/ReviewCurrentJizuReport";
import PageHafzReport from "./components/PageHafzReport";
import { ChevronLeft, ChevronRight, CheckRounded } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/application-api/http/api-client";
import { ReportModel, mapStageName, mapTrackName, mapTrackToDirection, reportTrackMap, tracks } from "@/application-api/models/all-models";
import { first, last, min, max, sortBy } from 'lodash';

// let cards = [
//   {
//     id: 2,
//     title: "عدد ايام الغياب",
//     subtitle: "عدد ايام الغياب للان",
//     content: "6",
//     btnText: "عرض الغياب",
//     btnLink: "/user/reports/absence-details",
//   },
//   {
//     id: 3,
//     title: "طلبات التخفيف",
//     subtitle: "عدد الطلبات للان",
//     content: "3",
//     btnText: "عرض الطلبات",
//     btnLink: "/user/reports/takhfeef-details",
//   },
//   {
//     id: 4,
//     title: "مقدار الحفظ اليومي",
//     subtitle: "مقدار الحفظ اليومي",
//     content: "4",
//     btnText: "تغيير الحفظ",
//     btnLink: "/user/reports",
//   },
// ];

const MainPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().substring(0, 10))
  const [currentPage, setCurrentPage] = useState('')
  const [firstPage, setFirstPage] = useState<string | undefined>('')
  const [lastPage, setLastPage] = useState<string | undefined>('')
  const [currentJizu, setCurrentJizu] = useState('')
  const [currentSura, setCurrentSura] = useState('')

  function nextDate() {
    console.log(Date.parse(currentDate));
    setCurrentDate(new Date(Date.parse(currentDate) + 1000 * 60 * 60 * 24).toISOString().substring(0, 10));
  };

  function previousDate() {
    console.log(Date.parse(currentDate));
    setCurrentDate(new Date(Date.parse(currentDate) - 1000 * 60 * 60 * 24).toISOString().substring(0, 10));
  };

  const userProfileQuery = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { data } } = await api.get('user/profile');

      try {
        const pages = JSON.parse(data?.user?.last_report?.pages)
        if (!Array.isArray(pages)) { throw Error('Not Array') }
        data.user.last_report.pages = pages;
        data.user.last_report.calc_hifz = parseInt(first((last(pages) || '').split('/')) || '');
      } catch (err) {
        data.user.last_report.pages = [];
        data.user.last_report.calc_hifz = null;
      }

      const last_page = data.user.last_report.calc_hifz;
      setCurrentPage(last_page as any);

      if (typeof last_page == 'number' && last_page <= 604 && last_page >= 1) {
        const [sura, ayah] = QuranPages[last_page]
        setCurrentJizu(QuranJizus.find(j => last_page >= (j.page || -1) && last_page <= (j.endPage || -1))?.title || '')
        setCurrentSura(QuranSuras[sura].nameAr as string)
      }

      return data?.user as {
        "id": number,
        "name": string,
        "image": null,
        "track": string,
        "role": string,
        "status": string,
        "daily_memorization_amount": number,
        "group_id": string,
        "stage": string,
        "group": {
          description: string,
          id: number,
          name: string,
          teachers: string[],
        },
        "last_report": ReportModel,
        "last_page": number,
        "jizu": number,
        "sura": string,
      }
    }
  })

  const memorizesPagesQuery = useQuery({
    queryKey: ['memorised-pages', currentDate],
    queryFn: async () => {
      const { data: { data } } = await api.get(`user/report_pages`) as { data: { data: string[] } };
      setFirstPage(first(sortBy(data)))
      setLastPage(last(sortBy(data)))
      return data
    }
  })

  const lastReportQuery = useQuery({
    queryKey: ['last-report', currentDate],
    queryFn: async () => {
      const { data: { data } } = await api.get(`user/report_by_date_and_type?date=${currentDate}&type=daily`);
      try {
        const pages = JSON.parse(data?.pages)
        if (!Array.isArray(pages)) { throw Error('Not Array') }
        data.pages = pages;
        data.calc_hifz = last(pages)
      } catch (err) {
        data.pages = [];
        data.calc_hifz = null;
      }
      return data as ReportModel
    }
  })

  const menuDialog = useDialog<any>({});
  const pageHafzDialog = useDialog<any>({
    done(data) {
      userProfileQuery.refetch();
      lastReportQuery.refetch();
      memorizesPagesQuery.refetch();
    },
  });
  const jizuReviewDialog = useDialog<any>({});
  const prevJizuReviewDialog = useDialog<any>({});
  const oldJizuReviewDialog = useDialog<any>({});
  const jizuTestDialog = useDialog<any>({});
  const stageTestDialog = useDialog<any>({});
  const normalRepeatDialog = useDialog<any>({});
  const heavyRepeatDialog = useDialog<any>({});
  const tajweedLessonDialog = useDialog<any>({});
  const permissionDialog = useDialog<any>({});
  const notesDialog = useDialog<any>({});

  function addReport(formType: string) {
    menuDialog.setIsOpen(false)
    switch (formType) {
      case 'PAGE_HAFZ':
        pageHafzDialog.openDialog({});
        break;
      case 'JIZU_REVIEW':
        jizuReviewDialog.openDialog({});
        break;
      case 'PREV_JIZU_REVIEW':
        prevJizuReviewDialog.openDialog({});
        break;
      case 'OLD_JIZU_REVIEW':
        oldJizuReviewDialog.openDialog({});
        break;
      case 'JIZU_TEST':
        jizuTestDialog.openDialog({})
        break;
      case 'STAGE_TEST':
        stageTestDialog.openDialog({})
        break;
      case 'NORMAL_REPEAT':
        normalRepeatDialog.openDialog({})
        break;
      case 'HEAVY_REPEAT':
        heavyRepeatDialog.openDialog({})
        break;
      case 'JIZU_LESSON':
        tajweedLessonDialog.openDialog({})
        break;
      case 'PERMISSION':
        permissionDialog.openDialog({})
        break;
      case 'NOTES':
        notesDialog.openDialog({})
        break;
      default:
        break;
    }
  }


  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-extrabold text-center">{userProfileQuery.data?.name}</h1>

      <div className="rounded-2xl report-card p-4 flex flex-col">
        {userProfileQuery.isLoading ? 'جاري التحميل ...' : <p>
          <div className="flex justify-between">
            <span>رقم الطالب</span>
            <span>{userProfileQuery.data?.id}</span>
          </div>
          <div className="flex justify-between">
            <span>رقم الحلقة</span>
            <span>{userProfileQuery.data?.group_id}</span>
          </div>
          <div className="flex justify-between">
            <span>اسم الحلقة</span>
            <span>{userProfileQuery.data?.group?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>المرحلة</span>
            <span>{mapStageName(userProfileQuery.data?.stage as any)}</span>
          </div>
          <div className="flex justify-between">
            <span>المسار</span>
            <span>{mapTrackName(userProfileQuery.data?.track as any)}</span>
          </div>
        </p>}
      </div>

      <h1 className="text-2xl font-extrabold text-center">الموقف الحالي</h1>

      <div className="rounded-2xl report-card p-4 flex flex-col">
        {userProfileQuery.isLoading ? 'جاري التحميل ...' : <p>
          <div className="flex justify-between">
            <span>الاتجاه</span>
            <span>{mapTrackToDirection(userProfileQuery.data?.track as any)}</span>
          </div>
          <div className="flex justify-between">
            <span>مقدار الحفظ اليومي</span>
            <span>{userProfileQuery.data?.daily_memorization_amount} صفحة</span>
          </div>
          <div className="flex justify-between">
            <span>الصفحة الاولى</span>
            <span>{firstPage}</span>
          </div>
          <div className="flex justify-between">
            <span>الصفحة الاخيرة</span>
            <span>{lastPage}</span>
          </div>
          <div className="flex justify-between">
            <span>الصفحة الحالية</span>
            <span>{currentPage}</span>
          </div>
          <div className="flex justify-between">
            <span>الجزء الحالي</span>
            <span>{currentJizu}</span>
          </div>
          <div className="flex justify-between">
            <span>السورة</span>
            <span>{currentSura}</span>
          </div>
        </p>}
      </div>

      {/* <pre>{JSON.stringify(sortBy(memorizesPagesQuery.data))}</pre> */}

      {/* كروت معلومات
      <h1 className="text-2xl font-extrabold text-center">كروت المعلومات</h1>
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
      </Grid> */}

      <h1 className="text-2xl font-extrabold text-center">التقارير</h1>
      <h1 className="text-xl font-extrabold text-center">
        <Button variant="contained" size="small" color="primary" onClick={previousDate}>
          <ChevronRight />
          السابق
        </Button>
        &nbsp;
        {currentDate}
        &nbsp;
        <Button variant="contained" size="small" color="primary" onClick={nextDate}>
          التالي
          <ChevronLeft />
        </Button>
      </h1>
      <Button variant="contained" color="primary" onClick={menuDialog.openDialog}>
        إضافة تقرير
      </Button>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {lastReportQuery.data?.calc_hifz &&
          <div className="rounded-2xl report-card p-4 flex flex-col gap-2 items-center">
            <CheckRounded fontSize="large" />
            <span>حفظ الوجه</span>
            <span>{first((lastReportQuery.data.calc_hifz || '').split('/'))}</span>
          </div>
        }
        {/* <div className="rounded-2xl report-card p-4 flex flex-col gap-2 items-center">
          <CheckRounded fontSize="large" />
          <span>مراجعة الحالي</span>
          <span>ص342 - ص338</span>
        </div> */}
        {/* <div className="rounded-2xl report-card p-4 flex flex-col gap-2 items-center">
          <CheckRounded fontSize="large" />
          <span>مراجعة السابق</span>
          <span>جزء 5</span>
        </div> */}
        {/* <div className="rounded-2xl report-card p-4 flex flex-col gap-2 items-center">
          <CheckRounded fontSize="large" />
          <span>مراجعة القديم</span>
          <span>جزء 4</span>
        </div> */}
      </div>

      {/* اضافة تقرير */}
      <Dialog
        open={menuDialog.isOpen}
        onClose={menuDialog.done}
      >
        <DialogContent>
          {!!userProfileQuery.data?.track && <Stack gap={1}>
            <DialogTitle>اضافة تقرير</DialogTitle>
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('PAGE_HAFZ') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("PAGE_HAFZ") }}>حفظ الوجه</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('JIZU_REVIEW') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("JIZU_REVIEW") }}>مراجعة الحالي</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('PREV_JIZU_REVIEW') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("PREV_JIZU_REVIEW") }}>مراجعة السابق</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('OLD_JIZU_REVIEW') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("OLD_JIZU_REVIEW") }}>مراجعة القديم</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('JIZU_TEST') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("JIZU_TEST") }}>عرض الاجزاء</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('STAGE_TEST') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("STAGE_TEST") }}>العرض المرحلي</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('NORMAL_REPEAT') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("NORMAL_REPEAT") }}>التكرار العادي</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('HEAVY_REPEAT') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("HEAVY_REPEAT") }}>التكرار المكثف</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('JIZU_LESSON') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("JIZU_LESSON") }}>درس تجويد</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('PERMISSION') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("PERMISSION") }}>غياب مع إستئذان</Button>
            }
            {reportTrackMap[userProfileQuery.data.track as keyof typeof tracks].includes('NOTES') &&
              <Button variant="contained" color="primary" onClick={() => { addReport("NOTES") }}>ملاحظات</Button>
            }
          </Stack>}
        </DialogContent>
        <DialogActions>
          <Button onClick={menuDialog.done}>إلغاء</Button>
        </DialogActions>
      </Dialog>

      {/* تقرير حفظ الوجه */}
      <Dialog
        open={pageHafzDialog.isOpen}
        onClose={pageHafzDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير حفظ الوجه</DialogTitle>
        <Divider />
        <DialogContent>
          <PageHafzReport params={{ memorizedPages: memorizesPagesQuery.data || [] }} done={pageHafzDialog.done} canceled={pageHafzDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* تقرير مراجعة الحالى */}
      <Dialog
        open={jizuReviewDialog.isOpen}
        onClose={jizuReviewDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير مراجعة الحالي</DialogTitle>
        <Divider />
        <DialogContent>
          <ReviewJizuReport done={prevJizuReviewDialog.done} canceled={prevJizuReviewDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* تقرير مراجعة السابق */}
      <Dialog
        open={prevJizuReviewDialog.isOpen}
        onClose={prevJizuReviewDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير مراجعة السابق</DialogTitle>
        <Divider />
        <DialogContent>
          <PrevJizuReviewReport done={prevJizuReviewDialog.done} canceled={prevJizuReviewDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* تقرير مراجعة القديم */}
      <Dialog
        open={oldJizuReviewDialog.isOpen}
        onClose={oldJizuReviewDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير مراجعة القديم</DialogTitle>
        <Divider />
        <DialogContent>
          <ReviewOldJizuReport done={oldJizuReviewDialog.done} canceled={oldJizuReviewDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* عرض الاجزاء */}
      <Dialog
        open={jizuTestDialog.isOpen}
        onClose={jizuTestDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير عرض الاجزاء</DialogTitle>
        <Divider />
        <DialogContent>
          <TestJizuReport done={jizuTestDialog.done} canceled={jizuTestDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* عرض المرحلي */}
      <Dialog
        open={stageTestDialog.isOpen}
        onClose={stageTestDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير عرض مرحلي</DialogTitle>
        <Divider />
        <DialogContent>
          <TestStageReport done={stageTestDialog.done} canceled={stageTestDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* تكرار عادي */}
      <Dialog
        open={normalRepeatDialog.isOpen}
        onClose={normalRepeatDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير تكرار عادي</DialogTitle>
        <Divider />
        <DialogContent>
          <RepeatNormalReport done={normalRepeatDialog.done} canceled={normalRepeatDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* تكرار مكثف */}
      <Dialog
        open={heavyRepeatDialog.isOpen}
        onClose={heavyRepeatDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة تقرير تكرار</DialogTitle>
        <Divider />
        <DialogContent>
          <RepeatHeavyReport done={heavyRepeatDialog.done} canceled={heavyRepeatDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* دروس التجويد */}
      <Dialog
        open={tajweedLessonDialog.isOpen}
        onClose={tajweedLessonDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة درس تجويد</DialogTitle>
        <Divider />
        <DialogContent>
          <TajweedLessonReport done={tajweedLessonDialog.done} canceled={tajweedLessonDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* إذن */}
      <Dialog
        open={permissionDialog.isOpen}
        onClose={permissionDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة إذن</DialogTitle>
        <Divider />
        <DialogContent>
          <PermissionReport done={permissionDialog.done} canceled={permissionDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      {/* ملاحظات */}
      <Dialog
        open={notesDialog.isOpen}
        onClose={notesDialog.done}
      >
        <DialogTitle textAlign={'center'}>إضافة ملاحظات</DialogTitle>
        <Divider />
        <DialogContent>
          <NoteReport done={notesDialog.done} canceled={notesDialog.canceled} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default MainPage;
