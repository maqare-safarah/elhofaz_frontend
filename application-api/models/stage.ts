export const stages = {
    'dabt': 'مرحلة الضبط',
    'taahhud': 'مرحلة التعاهد',
    'isnad': 'مرحلة الإسناد',
    'qiraat': 'مرحلة القراءات'
}

export function mapStageName(name: keyof typeof stages) {
    if (!name) {
        return '';
    } else if (Object.keys(stages).includes(name)) {
        return stages[name];
    } else {
        return '';
    }
}

export const tracks = {
    'beginner': 'الحافظ الجديد',
    'mid_level': 'التأهيلي',
    'high_level': 'الخاتم',
}

export function mapTrackName(name: keyof typeof tracks) {
    if (Object.keys(tracks).includes(name)) {
        return tracks[name];
    } else {
        return '';
    }
}

export const trackToDirection = {
    'beginner': 'من النهاية لأول جزء عم',
    'mid_level': 'من النهاية للبداية',
    'high_level': 'من البداية للنهاية',
}

export function mapTrackToDirection(name: keyof typeof trackToDirection) {
    if (Object.keys(trackToDirection).includes(name)) {
        return trackToDirection[name];
    } else {
        return '';
    }
}

export interface ReportModel {
    id: number
    chapters: string
    pages: string
    new: any
    previous: string
    old: string
    current_from: number
    current_to: number
    lesson: any
    listen: number
    repeat: number
    amount_of_pages: number
    repeated_amount: any
    stage: number
    level: any
    surah: number
    type: string
    mistakes: any
    hesitations: any
    warnings: any
    total_score: any
    max_score: any
    time_taken: any
    reported_at: string
    day: string
    teacher_id: number
    student_id: number
    created_at: string
    updated_at: string
    memorization_part: string
}


const reportSample = {
    "id": 12,
    "chapters": "[1,2]",
    "pages": "[1,2,3,4]",
    "new": null,
    "previous": "[1,2,3,4]",
    "old": "[1,2,3,4]",
    "current_from": 4,
    "current_to": 7,
    "lesson": null,
    "listen": 0,
    "repeat": 0,
    "amount_of_pages": 4,
    "repeated_amount": null,
    "stage": 0,
    "level": null,
    "surah": 1,
    "type": "daily",
    "mistakes": null,
    "hesitations": null,
    "warnings": null,
    "total_score": null,
    "max_score": null,
    "time_taken": null,
    "reported_at": "2024-02-12 10:10:10",
    "day": "الاثنين",
    "teacher_id": 1,
    "student_id": 1,
    "created_at": "2024-04-25T21:35:03.000000Z",
    "updated_at": "2024-04-25T21:35:03.000000Z",
    "memorization_part": "up"
}

type reportType = 'PAGE_HAFZ' |
    'JIZU_REVIEW' |
    'PREV_JIZU_REVIEW' |
    'OLD_JIZU_REVIEW' |
    'JIZU_TEST' |
    'STAGE_TEST' |
    'NORMAL_REPEAT' |
    'HEAVY_REPEAT' |
    'JIZU_LESSON' |
    'PERMISSION' |
    'TAAHUD' |
    'NOTES';

export const reportTrackMap: Record<keyof typeof tracks, reportType[]> = {
    beginner: [
        'PAGE_HAFZ',
        'JIZU_TEST',
        'JIZU_LESSON',
        'PERMISSION',
        'NOTES',
    ],
    mid_level: [
        'PAGE_HAFZ',
        'JIZU_REVIEW',
        'PREV_JIZU_REVIEW',
        'OLD_JIZU_REVIEW',
        'JIZU_TEST',
        'STAGE_TEST',
        'NORMAL_REPEAT',
        'HEAVY_REPEAT',
        'PERMISSION',
        'NOTES',
    ],
    high_level: [
        'OLD_JIZU_REVIEW',
        'PERMISSION',
        'NOTES',
    ],
}