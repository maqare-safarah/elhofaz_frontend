import { Box, Typography, Grid, Container } from "@mui/material";
import { AssignmentInd } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

export default function HomeTracks() {
  return (
    <div style={{ marginBottom: 80 }}>
      <Box
        mb={"30px"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}>
        <AssignmentInd
          fontSize="large"
          color="primary"
          sx={{ margin: "0 0 10px 0" }}
        />

        <Typography variant="h4" marginLeft={2} fontSize={30}>
          مسارات البرنامج
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={12} md={12}>
          <motion.container
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            viewport={{ once: true }}>
            <Container
              sx={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #e0e0e0",
              }}>
              <Accordion
                key={1}
                sx={{
                  backgroundColor: "#53421f",
                  color: "white",
                  padding: "8px",
                  marginY: "8px",
                }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon fontSize="large" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      letterSpacing: "1px",
                    }}>
                    {" "}
                    المسارالتأهيلي
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* ... */}
                  <Typography variant="body2">
                    هو مخصص للطلاب المبتدئين في القراءة والغرض منه تعريف الطالب
                    بالأحكام العامة للتجويد حيث يتم تدريبهم وتأهيلهم لقراءة
                    القرآن الكريم مجوداً وشرح دروس التجويد مع حفظ مقدار أسبوعي
                    وجهين في الأسبوع يتم قبول الطلاب مباشرة في هذا المسار تتراوح
                    مدته من أربعة إلى خمسة أشهر.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Container>
          </motion.container>
        </Grid>

        <Grid item xs={12} md={12}>
          <motion.container
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            viewport={{ once: true }}>
            <Container
              sx={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #e0e0e0",
              }}>
              <Accordion
                key={1}
                sx={{
                  backgroundColor: "#53421f",
                  color: "white",
                  padding: "8px",
                  marginY: "8px",
                }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon fontSize="large" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      letterSpacing: "1px",
                    }}>
                    {" "}
                    مسار الحافظ الجديد
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* ... */}
                  <Typography variant="body2">
                    هو مخصص للطلاب الذين يرغبون في حفظ كتاب الله كاملاً // يخضع
                    جميع طلاب هذا المسار لإختبار تمهيدي يتم من خلاله التأكد من
                    جودة القراءة والمخارج الصحيحة وإذا اجتاز الطالب هذا الاختبار
                    يحق له الدخول في المسار مباشرة وإذا لم يجتاز الاختبار يتم
                    تحويله إلى مسار التأهيل // يسمح لهم بمقدار يومي من الحفظ
                    (نصف وجه، وجه، وجهين)
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Container>
          </motion.container>
        </Grid>

        <Grid item xs={12} md={12}>
          <motion.container
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            viewport={{ once: true }}>
            <Container
              sx={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #e0e0e0",
              }}>
              <Accordion
                key={1}
                sx={{
                  backgroundColor: "#53421f",
                  color: "white",
                  padding: "8px",
                  marginY: "8px",
                }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon fontSize="large" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      letterSpacing: "1px",
                    }}>
                    {" "}
                    مسار الخاتم
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* ... */}
                  <Typography variant="body2">
                    هو مخصص للطلاب الحافظين للقرآن كاملاً ويرغبون بتجويد حفظهم
                    واتقانه أو الطلاب الذين تفلت منهم القرآن لضعف التعاهد او
                    الانشغال عن المراجعة المنتظمة الصحيحة // يتم قبول الطلاب
                    مباشرة في المسار بعد التأكد من صحة البيانات // يسمح لهم
                    بمقدار يومي من الحفظ (وجه، وجهين، ثلاثة أوجه، أربعة أوجه)
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Container>
          </motion.container>
        </Grid>

        {false && <Grid item xs={12} md={6}>
          <motion.container
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            viewport={{ once: true }}>
            <Container
              sx={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #e0e0e0",
              }}>
              <Accordion
                key={1}
                sx={{
                  backgroundColor: "#53421f",
                  color: "white",
                  padding: "8px",
                  marginY: "8px",
                }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon fontSize="large" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      letterSpacing: "1px",
                    }}>
                    {" "}
                    مسار الخمسة أجزاء
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* ... */}
                  <Typography variant="body2">
                    سيكون متاحا ان شاء الله لاحقاً ليساعد الطالب على حفظ أجزاء
                    معينة من القرآن
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Container>
          </motion.container>
        </Grid>}

        {false && <Grid item xs={12} md={6}>
          <motion.container
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            viewport={{ once: true }}>
            <Container
              sx={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #e0e0e0",
              }}>
              <Accordion
                key={1}
                sx={{
                  backgroundColor: "#53421f",
                  color: "white",
                  padding: "8px",
                  marginY: "8px",
                }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon fontSize="large" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      letterSpacing: "1px",
                    }}>
                    {" "}
                    مسار السور
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  ...
                  {/* <Typography variant="body2">
                    سيكون متاحا ان شاء الله لاحقاً ليساعد الطالب على حفظ سور
                    محددة كالبقرة وآل عمران والرحمن وغيرهم
                  </Typography> */}
                </AccordionDetails>
              </Accordion>
            </Container>
          </motion.container>
        </Grid>}
      </Grid>
    </div>
  );
}
