// utils/generateDocument.ts
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

interface FormData {
  name: string;
  email: string;
  documentTitle: string;
  phoneNumber: string;
  nikKtp: string;
}

const fetchTemplate = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch template from ${url}`);
  }
  return response.arrayBuffer();
};

const generateDocument = async (data: FormData): Promise<void> => {
  const templateUrl = "/template/basic.docx";
  const templateArrayBuffer = await fetchTemplate(templateUrl);
  const zip = new PizZip(templateArrayBuffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Mengisi template dengan data
  doc.setData(data);

  try {
    // Render dokumen
    doc.render();
  } catch (error) {
    console.error("Error rendering the document:", error);
    throw error;
  }

  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  // Menyimpan dokumen yang dihasilkan
  saveAs(
    out,
    `${data.name}-${data.documentTitle}-${new Date().toLocaleDateString(
      "id-ID",
      {
        dateStyle: "long",
      },
    )}.docx`,
  );
};

export default generateDocument;
