<template>
  <div class="text-left mx-10 my-5">
    <v-form v-model="attribute.valid" @submit.prevent @submit="onClickSubmit">
      <h1 class="text-center">Create Job</h1>
      <v-card title="Job Information" flat>
        <v-text-field
          label="Job Name"
          :rules="[requiredRule('Job Name')]"
          v-model="attribute.name"
          required
        ></v-text-field>

        <v-text-field
          label="Docker Image URL"
          :rules="[
            requiredRule('Docker Image URL'),
            urlRule('Docker Image URL'),
          ]"
          v-model="attribute.imageURL"
          required
        ></v-text-field>
      </v-card>
      <v-divider></v-divider>
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
          :rules="[requiredFileRule('File Input')]"
          v-model="attribute.file"
          @update:model-value="onFileUpdate"
        >
        </v-file-input>
        <h1 class="mb-3" v-if="attribute.fileValid">
          Total Task to be created:
          <b class="text-blue">{{ attribute.fileData.length }}</b>
        </h1>
      </v-card>
      <v-divider></v-divider>

      <v-btn class="w-full rounded-xl mt-3" variant="outlined" type="submit"
        >Submit</v-btn
      >
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCreateJob } from "./composable/useCreateJob";

export default defineComponent({
  name: "CreateJob",
  setup() {
    const { attribute, onClickSubmit, onFileUpdate } = useCreateJob();

    function requiredRule(fieldName: string) {
      return (value: any) => {
        if (value) {
          return true;
        }

        return `${fieldName} Value is required`;
      };
    }

    function urlRule(fieldName: string) {
      var urlPattern = new RegExp(
        "^(?:(?=[^:\/]{1,253})(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(?:\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))*(?::[0-9]{1,5})?/)?((?![._-])(?:[a-z0-9._-]*)(?<![._-])(?:/(?![._-])[a-z0-9._-]*(?<![._-]))*)(?::(?![.-])[a-zA-Z0-9_.-]{1,128})?$",
        "i"
      );
      return (value: any) => {
        try {
          if (!urlPattern.test(value)) {
            throw new Error();
          }
          return true;
        } catch (e) {
          return `${fieldName} must be a valud URL`;
        }
      };
    }

    function requiredFileRule(fieldName: string) {
      return (value: any) => {
        if (!value || value.length === 0) {
          return `${fieldName} is required`;
        }
        return true;
      };
    }

    return {
      attribute,
      onClickSubmit,
      requiredRule,
      urlRule,
      requiredFileRule,
      onFileUpdate,
    };
  },
});
</script>
