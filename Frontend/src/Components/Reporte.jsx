/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    fontSize: 12,
    marginBottom: 10,
  },
  signature: {
    marginTop: 30,
    textAlign: "center",
  },
});

function Reporte_contenido({
  nombres,
  apellidos,
  cedula,
  codigo,
  fecha,
  horaEntrada,
  horaSalida,
  ciudad,
  dia,
  mes,
  año,
  responsable,
  cargo,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>
            Universidad de las Fuerzas Armadas ESPE
          </Text>
          <Text style={styles.header}>
            Departamento de Ciencias de la Computación
          </Text>
          <Text style={styles.body}>Certificado de Asistencia</Text>
          <Text style={styles.body}>
            Por medio del presente se certifica que:
          </Text>
          <Text style={styles.body}>{`${nombres} ${apellidos}`}</Text>
          <Text style={styles.body}>{`Cédula de Identidad: ${cedula}`}</Text>
          <Text style={styles.body}>{`Código ID: ${codigo}`}</Text>
          <Text style={styles.body}>
            Ha asistido puntualmente a sus labores académicas en la fecha:
          </Text>
          <Text style={styles.body}>{fecha}</Text>
          <Text style={styles.body}>{`Hora de Entrada: ${horaEntrada}`}</Text>
          <Text style={styles.body}>{`Hora de Salida: ${horaSalida}`}</Text>
          <Text style={styles.body}>
            Este certificado se emite a solicitud del interesado para los fines
            que considere pertinentes.
          </Text>
          <Text style={styles.body}>Lugar y Fecha</Text>
          <Text
            style={styles.body}
          >{`Dado en ${ciudad}, a los ${dia} días del mes de ${mes} del año ${año}.`}</Text>
          <View style={styles.signature}>
            <Text>_________________________</Text>
            <Text>{responsable}</Text>
            <Text>{`Cargo: ${cargo}`}</Text>
            <Text>Departamento de Ciencias de la Computación</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function Reporte(props) {
  return (
    <div>
      <PDFViewer width="100%" height="600">
        <Reporte_contenido {...props} />
      </PDFViewer>
      <PDFDownloadLink
        document={<Reporte_contenido {...props} />}
        fileName="certificado_asistencia.pdf"
      >
        {({ loading }) =>
          loading ? "Generando documento..." : "Descargar PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default Reporte;
