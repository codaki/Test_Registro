/* eslint-disable react/prop-types */

import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";

export default function ReporteNovedades({ mes, anio }) {
  useEffect(() => {
    const fetchAtrasados = async () => {
      try {
        console.log(mes, anio);
        const response = await axios.get(
          "http://localhost:3000/api/registros-atrasos",
          {
            params: {
              mes: mes,
              anio: anio,
            },
          }
        );
        setAttendance(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAtrasados();
  }, [mes, anio]);

  const [attendance, setAttendance] = useState([]);

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

    doc.text(`Mes: ${mes}`, 105, 50, { align: "center" });
    doc.text(`Año: ${anio}`, 105, 60, {
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
