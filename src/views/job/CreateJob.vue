<template>
  <div>
    <v-stepper
      :items="['Input Basic Job Information', 'Task Creation', 'Reivew']"
    >
      <template v-slot:item.1>
        <v-card title="Job Information" flat>
          <v-form>
            <v-text-field label="Job Name"></v-text-field>

            <v-text-field label="Image URL"></v-text-field>
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
          <v-file-input class="ht-3" label="File input"></v-file-input>
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
      name: "Distriuted Hash Calculating",
      imageURL: "sirateek/rajds-hash-calculating:1",
      file: "File Input",
    });

    return {
      attribute,
    };
  },
});
</script>
