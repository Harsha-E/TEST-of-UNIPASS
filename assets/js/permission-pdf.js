import { jsPDF } from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.es.min.js";

export function generatePermissionPDF(data){
 const pdf = new jsPDF();

 // Header
 pdf.setFillColor(37,99,235);
 pdf.rect(0,0,210,30,"F");
 pdf.setTextColor(255,255,255);
 pdf.setFontSize(16);
 pdf.text("UNI PASS • OFFICIAL PERMISSION",105,18,{align:"center"});

 // Body
 pdf.setTextColor(0,0,0);
 pdf.setFontSize(11);

 let y=45;
 const line=(l,r)=>{
   pdf.text(l,20,y);
   pdf.text(r,120,y);
   y+=8;
 };

 line("Student Name:", data.name);
 line("Registration No:", data.regd);
 line("Department:", data.department);
 y+=5;
 line("Subject:", data.subject);
 line("Reason:", data.reason);
 y+=5;
 line("Permission ID:", data.hash);
 line("Status:", "APPROVED");
 y+=5;
 line("Requested At:", data.requestedAt);
 line("Approved By:", data.approvedBy);
 line("Approved At:", data.approvedAt);

 // Footer
 pdf.setDrawColor(200);
 pdf.line(20,270,190,270);
 pdf.setFontSize(9);
 pdf.text("This is a system-generated permission. No signature required.",105,278,{align:"center"});

 pdf.save(`UniPass_${data.hash}.pdf`);
}
