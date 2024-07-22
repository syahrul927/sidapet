// utils/generateDocument.ts
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import { formatDate } from "~/lib/utils";

const fetchTemplate = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch template from ${url}`);
  }
  return response.arrayBuffer();
};

const flatten = (obj: any): any => {
  let result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (typeof element === "object" && !(element instanceof Date)) {
        result = { ...result, ...element };
      } else {
        result = { ...result, [key]: element };
      }
    }
  }
  return result;
};
const generateDocument = async (
  values: any,
  templateUrl: string,
): Promise<void> => {
  const data = flatten(values);
  const fixData: Record<string, any> = {};
  for (const key in data) {
    if (Object.hasOwn(data, key)) {
      const element = data[key];
      if (element instanceof Date) {
        fixData[key] = formatDate(element);
      } else {
        fixData[key] = element;
      }
    }
  }
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
