<template>
  <div>
    <v-stepper item-value="2">
      <v-stepper-header>
        <v-stepper-item
          title="Select campaign settings"
          value="1"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item title="Create an ad group" value="2"></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item title="Create an ad" value="3"></v-stepper-item>
      </v-stepper-header>

      <template v-slot:item.1>
        <v-card title="Job Information" flat>
          <v-form>
            <v-text-field
              label="Job Name"
              v-model="attribute.name"
            ></v-text-field>

            <v-text-field
              label="Image URL"
              v-model="attribute.imageURL"
            ></v-text-field>
          </v-form>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card class="text-left" title="Task Creation" flat>
          <h2>
            Upload the file that contain the task attribute in format of JSON in
            form of array of task attribute
          </h2>
          <a href="https://google.com" class="text-blue"
            >Download an example file</a
          >
          <v-file-input
            class="ht-3"
            label="File input"
            accept="application/json"
            v-model="attribute.file"
          >
          </v-file-input>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Review" class="text-left" flat>
          <v-form>
            <v-text-field
              label="Job Name"
              v-model="attribute.name"
              disabled
            ></v-text-field>

            <v-text-field
              label="Image URL"
              v-model="attribute.imageURL"
              disabled
            ></v-text-field>

            <v-file-input
              class="ht-3"
              label="File input"
              disabled
            ></v-file-input>

            <h1>Total Task to be created: <b class="text-blue">30</b></h1>
            <v-btn @click="onClickSubmit">Submit</v-btn>
          </v-form>
        </v-card>
      </template>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateJob",
  setup() {
    const attribute = reactive({
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

    async function onClickSubmit() {}

    return {
      attribute,
      onClickSubmit,
    };
  },
});
</script>
