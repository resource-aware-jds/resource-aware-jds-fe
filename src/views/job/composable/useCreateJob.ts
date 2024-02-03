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
    console.log(attribute.valid);
    console.log(e);
    console.log("Here1");
  }

  return {
    attribute,
    onClickSubmit,
  };
}
