/* eslint-disable react/prop-types */
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function Reporte(props) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [registrosMensual, setRegistrosMensual] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(props.profesor_id);
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/registrosMensual",
          {
            params: {
              Profesor_ID: props.profesor_id,
              mes: props.mes,
              anio: props.anio,
            },
          }
        );
        setRegistrosMensual(response.data);
      } catch (error) {
        console.error("Error fetching registros:", error);
        setShowModal(true);
      }
    };

    fetchRegistros();
  }, [props.profesor_id]);

  const generarPDF = () => {
    if (!registrosMensual) return;

    const doc = new jsPDF();

    // Encabezado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Universidad de las Fuerzas Armadas ESPE", 105, 20, {
      align: "center",
    });
    doc.setFontSize(14);
    doc.text("Departamento de Ciencias de la Computación", 105, 30, {
      align: "center",
    });

    // Información del profesor
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("REGISTRO DE ASISTENCIA MENSUAL", 105, 40, { align: "center" });
    doc.text(`Nombre: ${registrosMensual.nombre_completo}`, 20, 60);
    doc.text(`Docente ID: ${registrosMensual.docente_id}`, 20, 70);
    doc.text(`Mes: ${registrosMensual.mes}/${registrosMensual.anio}`, 20, 80);

    // Procesar registros para la tabla
    const registrosProcesados = procesarRegistros(registrosMensual.registros);

    // Tabla de asistencia
    doc.autoTable({
      startY: 90,
      head: [
        [
          "Día",
          "Fecha",
          "Hora Entrada",
          "Hora Salida",
          "Horas Permanencia",
          "¿Llegó Tarde?",
        ],
      ],
      body: registrosProcesados.map((reg) => [
        reg.dia,
        new Date(reg.fecha).toLocaleDateString(),
        reg.horaEntrada || "--:--",
        reg.horaSalida || "--:--",
        reg.horasPermanencia || "--:--",
        reg.tarde ? "Sí" : "No",
      ]),
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  const procesarRegistros = (registros) => {
    // Agrupar registros por día
    const registrosPorDia = registros.reduce((acc, reg) => {
      const fecha = reg.dia.split("T")[0];
      if (!acc[fecha]) {
        acc[fecha] = {
          fecha: reg.dia,
          dia: new Date(reg.dia).toLocaleDateString("es-ES", {
            weekday: "long",
          }),
          registros: [],
        };
      }
      acc[fecha].registros.push(reg);
      return acc;
    }, {});

    // Procesar cada día
    return Object.values(registrosPorDia).map((dia) => {
      const entradas = dia.registros.filter((r) => r.bool_inicio);
      const salidas = dia.registros.filter((r) => !r.bool_inicio);

      return {
        dia: dia.dia.charAt(0).toUpperCase() + dia.dia.slice(1),
        fecha: dia.fecha,
        horaEntrada: entradas.length > 0 ? entradas[0].hora : null,
        horaSalida: salidas.length > 0 ? salidas[0].hora : null,
        tarde: entradas.length > 0 ? entradas[0].tarde : false,
        horasPermanencia: calcularHorasPermanencia(
          entradas[0]?.hora,
          salidas[0]?.hora
        ),
      };
    });
  };

  const calcularHorasPermanencia = (entrada, salida) => {
    if (!entrada || !salida) return null;

    const [horaEntrada, minEntrada] = entrada.split(":").map(Number);
    const [horaSalida, minSalida] = salida.split(":").map(Number);

    let diferenciaHoras = horaSalida - horaEntrada;
    let diferenciaMinutos = minSalida - minEntrada;

    if (diferenciaMinutos < 0) {
      diferenciaHoras--;
      diferenciaMinutos += 60;
    }

    return `${diferenciaHoras} H ${diferenciaMinutos} Min`;
  };

  return (
    <div className="p-4">
      <button
        className="border p-2 bg-blue-500 text-white rounded"
        onClick={generarPDF}
      >
        Generar PDF
      </button>

      {pdfUrl && (
        <div className="mt-4 h-96">
          <h3>Vista previa del PDF:</h3>
          <iframe src={pdfUrl} width="100%" height="500px"></iframe>
          <a href={pdfUrl} download="registro_asistencia.pdf">
            <button className="mt-2 p-2 bg-green-500 text-white rounded">
              Descargar PDF
            </button>
          </a>
        </div>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="No hay registros disponibles"
        message="No se encontraron registros de asistencia para el período seleccionado."
      />
    </div>
  );
}

export default Reporte;
