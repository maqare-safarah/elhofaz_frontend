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

export interface User {
    id: number
    name: string
    username: string
    phone_code: number
    phone: number
    email: string
    password: string
    birth_date: string
    nationality: string
    residation: string
    identification: string
    image: any
    gender: string
    status: string
    can_accept_beginner_user: number
    can_accept_user: number
    created_at: string
    updated_at: string
    age: number
    pivot: Pivot
  }
  
  export interface Pivot {
    group_id: number
    teacher_id: number
  }
  

const userSample = {
    "id": 1,
    "name": "ahmed test",
    "username": "test5212",
    "phone_code": 20,
    "phone": 123456974,
    "email": "a@a.com32212",
    "password": "$2y$10$4SrZQ.obTKXiGQKekesDZOFHuTKdiP1hYNcdSv3n6Uw.5QMUn.M3W",
    "birth_date": "2000-05-05",
    "nationality": "egypt",
    "residation": "test",
    "identification": "1234",
    "image": null,
    "gender": "male",
    "status": "active",
    "can_accept_beginner_user": 1,
    "can_accept_user": 0,
    "created_at": "2024-01-22T16:27:35.000000Z",
    "updated_at": "2024-02-12T14:27:59.000000Z",
    "age": 23,
    "pivot": {
        "group_id": 10,
        "teacher_id": 1
    }
}