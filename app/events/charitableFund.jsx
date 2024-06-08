import React, { useState } from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import FormGroup from '@mui/material/FormGroup'
import { Divider, Grid, Container, IconButton } from "@mui/material";
import { EmailOutlined, WhatsApp } from "@mui/icons-material";


import { motion } from "framer-motion";
import { support } from '@/lib/events';


export default function CharitableFund({ setting, data, setError, setLoading, setSuccess }) {
  // let [name, setName] = useState("");
  //   let [phone, setPhone] = useState("");
  //   let [email, setEmail] = useState("");

  let [amount, setAmount] = useState("")
  // console.log(setting)

  // let [hideIdentity, setHideIdentity] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let body = { amount }

    let res = await support(body);

    if (res.code == 200) {
      setSuccess("تم إرسال الرسالة بنجاح");
      setAmount("");

    } else {
      setError(res.message);
    }
    setLoading(false);
  };



  return (
    <Box
      id="CF"
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 1,
        backgroundColor: "#bb9457",
      }}>
      <Container maxWidth={'md'}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mt: 6,
            marginBottom: 3,
            color: "white",
          }}>
          صندوق الدعم الخيري
        </Typography>
        <Typography
          color={'white'} mt={3} mb={3}
          variant="body6" paragraph>
          يختص صندوق الدعم الخيري بجمع تبرعات بغرض دعم الحوجات المختلفة (زواج , وفاة , عملية جراحية , بئر , كسوة ...الخ).
        </Typography>
        <Typography
          color={'white'} mt={3} mb={3}
          variant="body6" paragraph> على من يرغب بأن يساعد البرنامج في دعم الحوجات تحويل المبلغ المراد المساهمة به في اي من الحسابات ادناه. ومن ثم ارسال الاشعار الى رقم الواتساب الموجود اسفل القائمة (اضغط على الرقم ليتم تحويلك الى الواتساب مباشرة).
          واخيرا ادخال المبلغ المرسل داخل فورمة بيانات الصندوق
        </Typography>

        <img src='/support.jpg' />

        <br />

        {/* <Container>
        <Box pb={8} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'

              }}>
        <Paper
          elevation={3}
          sx={{
            // backgroundColor: "rgba(255, 255, 255, 0.9)",
            border:'1px solid white',
            backgroundColor:'#432818',
            color:'white',
            py: 2,
            width: "100%",
          }}>
            
          </Paper></Box></Container> */}

        {/* <Box> */}

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          {/* <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  viewport={{ once: true }}> */}

          <Paper
            elevation={3}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              p: 2,
              width: "100%",
            }}>
            <form
              onSubmit={handleSubmit}
              action={"#"}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}>
              <h2 className="text-lg text-center">بيانات الصندوق</h2>


              {/* <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">توجيه الدعم الى:</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="contests" control={<Radio />} label="المسابقات" />
                        <FormControlLabel value="hafiz" control={<Radio />} label="الحوافز" />
                        <FormControlLabel value="programs" control={<Radio />} label="البرامج(اشتراكات,...)" />
                        <FormControlLabel value="charity projects" control={<Radio />} label="المشاريع الخيرية" />
                        <FormControlLabel value="others" control={<Radio />} label="أخرى" />

                      </RadioGroup>
                    </FormControl> */}

              {/* +249112217441 */}
              <Container sx={{ display: 'flex', justifyContent: 'center', px: 0, my: 2 }}>

                <BankAccBox title="بنكك"
                  account_number={setting.account_number}
                  account_name={setting.account_name} />

                <BankAccBox title="فوري"
                  account_number={setting.account_iban}
                  account_name={setting.account_name} />
              </Container>


              <Box m={3}>
                <BankAccBox title="المبلغ المجموع حتى الان"
                  account_number={setting.total_collection || 0}
                  account_name={setting.total_collection_currency || 'جنيه سوداني'} />
              </Box>

              <Divider sx={{ backgroundColor: 'white' }}></Divider>

              <Container sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Typography textAlign={'left'} flexGrow={1} sx={{
                  my: 1,
                }}> رقم الواتساب</Typography>

                <Typography textAlign={'center'} flexGrow={1} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#58341f',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '5px',

                  ":hover": {
                    backgroundColor: '#2b190e',
                    color: 'white'
                  }
                }}>
                  <a href={`https://wa.me/${setting.account_whatsapp}?text=`} target='_blank' style={{ width: '100%' }}>
                    <span dir='ltr'>{setting.account_whatsapp}</span>
                  </a>
                </Typography>
              </Container>
              <Divider sx={{ backgroundColor: 'white' }}></Divider>
              <TextField
                id="outlined-basic"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                label="مقدار الدعم المرسل"
                variant="outlined"
                type="text"
                helperText="المقدار يكتب بصورة ارقام فقط"
                sx={{
                  my: 1,
                }}
                required
              />

              <FormControlLabel control={<Checkbox />} label="أوافق على ان يقوم برنامج مقارئ السفرة بتوجيه الدعم الى الحوجات الموجودة" required />

              <Button variant="contained" type="submit" sx={{ m: 1 }}>
                إرسال
              </Button>
            </form>
          </Paper>
          {/* </motion.div> */}
        </Box>
        {/* </Grid> */}
      </Container>
      {/* </Box> */}
    </Box>)
}

function BankAccBox(props) {
  return (
    <Box flexGrow={1} border={'solid 1px'} color={'white'} bgcolor={'#432818'} mx={0}>
      <Typography variant="h6" className="text-center" >{props.title}</Typography>
      <Container sx={{
        display: 'flex',
        justifyContent: 'left',
      }}>
        <Typography flexGrow={1} textAlign={'center'} sx={{
          fontStyle: 'bold'
        }}> {props.account_number}</Typography>
      </Container>
      <Container sx={{
        display: 'flex',
        justifyContent: 'left',
      }}>
        <Typography textAlign={'center'}
          whiteSpace={'nowrap'} flexGrow={1} fontSize={14} sx={{
          }}>{props.account_name}</Typography>
      </Container>
    </Box>
  )
}

