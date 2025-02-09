/* eslint-disable no-unused-vars */
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";

export default function AttendanceReport() {
  const [formData, setFormData] = useState({
    nombres: "Mauricio Renan",
    apellidos: "Loachamin Valencia",
    cedula: "2987",
    codigo: "123456",
    mes: "Febrero",
    año: "2025",
    responsable: "Ing. Sonia Cárdenas",
    cargo: "Directora",
  });

  const [attendance, setAttendance] = useState([
    {
      ord: 1,
      ci: "2987",
      nombre: "Mauricio Renan Loachamin Valencia",
      id: "123456",
      modalidad: "Presencial",
      mes: "Enero",
      dia: "07",
      atraso: "Sí",
      tiempoAtraso: "10 Min",
    },
    {
      ord: 2,
      ci: "5678",
      nombre: "Juan Perez",
      id: "789012",
      modalidad: "Teletrabajo",
      mes: "Enero",
      dia: "08",
      atraso: "No",
      tiempoAtraso: "0 Min",
    },
    {
      ord: 3,
      ci: "9101",
      nombre: "Ana Torres",
      id: "345678",
      modalidad: "Presencial",
      mes: "Enero",
      dia: "09",
      atraso: "Sí",
      tiempoAtraso: "5 Min",
    },
  ]);

  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Universidad de las Fuerzas Armadas ESPE", 105, 20, {
      align: "center",
    });
    doc.setFontSize(14);
    doc.text("Departamento de Ciencias de la Computación", 105, 30, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("REPORTE DE NOVEDADES MENSUALES DEL PERSONAL DOCENTE", 105, 40, {
      align: "center",
    });

    doc.text(`Mes: ${formData.mes}`, 105, 50, { align: "center" });
    doc.text(`Año: ${formData.año}`, 105, 60, {
      align: "center",
    });

    doc.autoTable({
      startY: 70,
      head: [
        [
          "ORD.",
          "C.I.",
          "NOMINA DEL PERSONAL ADMINISTRATIVO",
          "ID",
          "MODALIDAD LABORAL",
          "MES",
          "DIA",
          "Atraso",
          "Tiempo de atraso",
        ],
      ],
      body: attendance.map((record) => [
        record.ord,
        record.ci,
        record.nombre,
        record.id,
        record.modalidad,
        record.mes,
        record.dia,
        record.atraso,
        record.tiempoAtraso,
      ]),
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div className="p-4">
      <button onClick={generatePDF}>Generar PDF</button>
      {pdfUrl && (
        <div className="mt-4">
          <h3>Vista previa del PDF:</h3>
          <iframe src={pdfUrl} width="100%" height="500px"></iframe>
          <a href={pdfUrl} download="reporte_asistencia.pdf">
            <button>Descargar PDF</button>
          </a>
        </div>
      )}
    </div>
  );
}
