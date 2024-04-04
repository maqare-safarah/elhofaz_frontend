import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Link from "next/link";

export default function RecitingCorrection( {teachers, sessions} ) {
  const teachersData = [
    { name: 'شيخ هاشم محمد', date: '2023-12-11 الاثنين', hour: '4:30 عصراً', subject: 'تلاوة سورة الفاتحة', lessonLink: '/lessons/123', lessonText:'عرض الحلقة'  },
    { name: 'شيخ علي عمر', date: '2023-12-26 الثلاثاء', hour: '2:00 ظهراً', subject: 'تلاوة سورة الفاتحة', lessonLink: '/lessons/123', lessonLink: '/lessons/456', lessonText:'غير متوفر' },
    { name: 'شيخ علي عمر', date: '2023-12-26 الثلاثاء', hour: '2:00 ظهراً', subject: 'تلاوة سورة الفاتحة', lessonLink: '/lessons/123',lessonLink: '/lessons/456', lessonText:'غير متوفر' },
    { name: 'شيخ علي عمر', date: '2023-12-26 الثلاثاء', hour: '2:00 ظهراً', subject: 'تلاوة سورة الفاتحة', lessonLink: '/lessons/123',lessonLink: '/lessons/456', lessonText:'غير متوفر' },
    { name: 'شيخ علي عمر', date: '2023-12-26 الثلاثاء', hour: '2:00 ظهراً', subject: 'تلاوة سورة الفاتحة', lessonLink: '/lessons/123',lessonLink: '/lessons/456', lessonText:'غير متوفر' },
    { name: 'شيخ علي عمر', date: '2023-12-26 الثلاثاء', hour: '2:00 ظهراً', subject: 'تلاوة سورة الفاتحة', lessonLink: '/lessons/123',lessonLink: '/lessons/456', lessonText:'غير متوفر' },
    // Add more teacher data as needed
  ];

  const getTeacherName = (teachers,id) => {
    let teacherName 
    teachers.map(teacher =>{
      if (teacher.id == id) teacherName = teacher.name
      
      })
      return teacherName
      
      // if(teacher.id == id) {
      //   // console.log(teacher.id)
      //   // console.log(id)
      //   // console.log(teacher.name)
      //   return `${teacher.name}`
      // }
      // else {

      //   return null
      // }

    
  }

  return (
  <div id='RC'>
    <Container disableGutters id="RC" maxWidth="md" sx={{ 
      px:1,
      py: 4,
      display: {xs:"flex",sm:'none'},
        flexDirection: "column",
        justifyContent:'center',
        alignItems: 'center',
        width: "100%",
        minHeight: "100vh", }}>
      <Typography variant="h4" gutterBottom mb={4} textAlign={'center'}>
      تصحيح التلاوة
      </Typography>
      <Typography variant="body4" paragraph>
        هو برنامج مفتوح للعامة لتصحيح التلاوة. سيتم توفير رابط الحلقة عن طريق (google meet) او (Zoom).
      </Typography>
      { sessions.length ? ( 
      <TableContainer component={Paper} sx={{color:'#fff',backgroundColor:'#432818', border:'2px white solid',}}>
        
        <Table sx={{maxWidth:'xs'}}>
          <TableHead >
            <TableRow sx={{display:'flex', justifyContent:'center'}}>
              <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:'2px', whiteSpace: 'nowrap', }}>المعلمين</TableCell>
              
              <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap', }}>تاريخ الحلقة</TableCell>
              <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap', }}>توقيت الحلقة</TableCell>
              <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap', }}>رابط الحلقة</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session, index) => (
              
              <TableRow key={index} sx={{ display:'flex',justifyContent:'center' }}>

                <TableCell sx={{color:'#fff', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:'2px', whiteSpace: 'nowrap', }}>
                  <Typography variant="body2" component="span" sx={{ display: 'block', fontSize:11 }}>
                  {`1. ${getTeacherName(teachers, session.teacher_id) || `----` }`} </Typography> 
                  <Typography variant="body2" component="span" sx={{ display: 'block', fontSize:11 }}> 
                  {`2. ${getTeacherName(teachers,session.teacher2_id) || `----`}`}
                  </Typography>
                </TableCell>

                

                <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap'}}><Typography variant="body2" component="span" sx={{ display: 'block', fontSize:11 }}>{session.date}</Typography></TableCell>
                <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap'}}><Typography variant="body2" component="span" sx={{ display: 'block', fontSize:11 }}>{session.time}</Typography></TableCell>
                
                <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1}}>
                  <Container sx={{
                    py:'2px',
                    color:'#000', 
                    border:'white 1px solid',
                    borderRadius:'5px', 
                    backgroundColor:'white',
                    cursor:'pointer', 
                    ":hover":{
                    backgroundColor:'#432818',
                     color:'#fff'
                  }}}>
                  <Typography variant="body2" component="span" sx={{ display: 'block', fontSize:11 }}>
                  <Link href={session.link} target="_blank" rel="noopener noreferrer" >
                  {session.title}
                  </Link></Typography></Container>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
        
      </TableContainer>) : <></>}
      {!sessions.length && 
              (<Typography variant="body4" paragraph p={8}>
                لا توجد دروس الآن
              </Typography>)
        }
    </Container>
    
        <Container id="RC" maxWidth="sm" sx={{ 
          px:1,
          py: 4,
          display: {xs:"none",sm:'flex'},
            flexDirection: "column",
            justifyContent:'center',
            alignItems: 'center',
            width: "100%",
            minHeight: "100vh", }}>
          <Typography variant="h4" gutterBottom mb={4} textAlign={'center'}>
          تصحيح التلاوة
          </Typography>
          <Typography variant="body4" paragraph>
            هو برنامج مفتوح للعامة لتصحيح التلاوة. سيتم توفير رابط الحلقة عن طريق (google meet) او (Zoom).
          </Typography>
          { sessions.length ? ( 
          <TableContainer component={Paper} sx={{color:'#fff',backgroundColor:'#432818', border:'2px white solid',}}>
            
            <Table>
              <TableHead >
                <TableRow sx={{display:'flex', justifyContent:'center'}}>
                  <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:'2px', whiteSpace: 'nowrap', }}>المعلمين</TableCell>
                  
                  <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap', }}>تاريخ الحلقة</TableCell>
                  <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap', }}>توقيت الحلقة</TableCell>
                  <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap', }}>رابط الحلقة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions.map((session, index) => (
                  
                  <TableRow key={index} sx={{ display:'flex',justifyContent:'center' }}>
    
                    <TableCell sx={{color:'#fff', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:'2px', whiteSpace: 'nowrap', }}>
                      <Typography variant="body2" component="span" sx={{ display: 'block', fontSize: '14px' }}>
                      {`1. ${getTeacherName(teachers,session.teacher_id) || `----` }`} </Typography> 
                      <Typography variant="body2" component="span" sx={{ display: 'block', fontSize: '14px' }}> 
                      {`2. ${getTeacherName(teachers,session.teacher2_id) || `----`}`}
                      </Typography>
                    </TableCell>
    
                    
    
                    <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap'}}><Typography variant="body2" component="span" sx={{ display: 'block', fontSize: '14px' }}>{session.date}</Typography></TableCell>
                    <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1, whiteSpace: 'nowrap'}}><Typography variant="body2" component="span" sx={{ display: 'block', fontSize: '14px' }}>{session.time}</Typography></TableCell>
                    
                    <TableCell sx={{color:'#fff', textAlign:'center', fontSize: '14px',flexGrow:1,maxWidth:'20%',minWidth:'25%',px:1}}>
                      <Container sx={{
                        py:'1px',
                        color:'#000', 
                        border:'white 1px solid',
                        borderRadius:'5px', 
                        backgroundColor:'white',
                        cursor:'pointer', 

                        ":hover":{
                        backgroundColor:'#432818',
                         color:'#fff'
                      }}}>
                      <Typography variant="body2" component="span" sx={{ display: 'block', fontSize: '14px' }}>
                      <Link href={session.link} target="_blank" rel="noopener noreferrer" >
                      {session.title}
                      </Link></Typography></Container>
                    </TableCell>
                  </TableRow>
                
                ))} 
              </TableBody>
            </Table>
            
          </TableContainer>) : <></>}
          {!sessions.length && 
                  (<Typography variant="body4" paragraph p={8} textAlign={'center'}>
                    لا توجد دروس الآن
                  </Typography>)
            }
        </Container>
        </div>
  )
}
