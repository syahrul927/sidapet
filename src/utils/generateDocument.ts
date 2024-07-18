// utils/generateDocument.ts
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

const fetchTemplate = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch template from ${url}`);
  }
  return response.arrayBuffer();
};

const padDate = (str: string | number) => {
  return String(str).padStart(2, "0");
};
const generateDocument = async (data: any): Promise<void> => {
  const fixData: { [keyof: string]: string } = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (element instanceof Date) {
        fixData[key] =
          `${padDate(element.getDate())}/${padDate(element.getMonth() + 1)}/${element.getFullYear()}`;
      } else {
        fixData[key] = element;
      }
    }
  }
  const templateUrl = "/template/SKU.docx";
  const templateArrayBuffer = await fetchTemplate(templateUrl);
  const zip = new PizZip(templateArrayBuffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Mengisi template dengan data
  doc.setData(fixData);

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
    `${data.name}-${data.documentCode}${data.documentCounter}-${new Date().toLocaleDateString(
      "id-ID",
      {
        dateStyle: "long",
      },
    )}.docx`,
  );
};

export default generateDocument;
