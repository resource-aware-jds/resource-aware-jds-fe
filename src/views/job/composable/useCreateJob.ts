import { TaskCreationModel } from "@/models/task/task";
import RepositoryFactory from "@/repository/repositoryFactory";
import router from "@/router";
import { reactive } from "vue";

export function useCreateJob() {
  const attribute = reactive({
    valid: false,
    requiredRules: [
      (value: any) => {
        if (value) {
          return true;
        }
        return "Value required";
      },
    ],
    name: "",
    imageURL: "",
    file: [] as Array<File>,
    fileData: [] as Array<TaskCreationModel>,
    fileValid: false,
  });

  async function loadFileAndConvertToJson(data: File): Promise<object> {
    const fileArrayBuffer = await data.arrayBuffer();
    const uint8Array = new Uint8Array(fileArrayBuffer);
    let result = "";
    for (let i = 0; i < uint8Array.byteLength; i++) {
      result = result + String.fromCharCode(uint8Array[i]);
    }

    return JSON.parse(result);
  }

  async function onClickSubmit(e: any) {
    if (!attribute.valid || !attribute.fileValid) {
      console.log("Validation Failed");
      return;
    }

    const response = await RepositoryFactory.instance.jobRepository.createJob({
      name: attribute.name,
      imageURL: attribute.imageURL,
      taskAttributes: attribute.fileData,
    });

    router.replace({
      name: "job-detail",
      params: {
        jobID: response.id,
      },
    });
  }

  async function onFileUpdate(fileData: any) {
    const fileDataParsed = await loadFileAndConvertToJson(fileData[0]);
    if (!Array.isArray(fileDataParsed)) {
      console.log("File is invalid, not array");
      return;
    }

    const fileDataParsedCaseToModel =
      fileDataParsed as Array<TaskCreationModel>;

    attribute.fileData = fileDataParsedCaseToModel;
    attribute.fileValid = true;
  }

  return {
    attribute,
    onClickSubmit,
    onFileUpdate,
  };
}
