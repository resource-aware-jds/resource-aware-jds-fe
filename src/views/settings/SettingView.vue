<template>
  <div class="text-left h-full flex flex-col p-6 gap-5">
    <div class="text-h4">
      <v-icon icon="mdi-cog"></v-icon> {{ t("page.setting.title") }}
    </div>
    <v-card
      variant="outlined"
      class="p-5 overflow-y-scroll rounded-2xl h-full flex flex-col gap-20"
    >
      <!-- Time Setting -->
      <div>
        <v-card-title class="text-teal font-weight-bold"
          ><v-icon icon="mdi-clock"></v-icon>
          {{ t("page.setting.category.time.title") }}</v-card-title
        >
        <v-divider></v-divider>
        <setting-item
          :localization="true"
          title="page.setting.category.time.subCategory.format.title"
          subtitle="page.setting.category.time.subCategory.format.description"
        >
          <div class="py-5">
            <a
              class="text-blue"
              href="https://momentjs.com/docs/#/displaying/format/"
              target="_blank"
              >See Format Options</a
            >
          </div>
          <v-text-field v-model="timeFormatRef"></v-text-field>
          <v-btn @click="onSaveTimeformat" color="primary">
            {{ t("page.setting.category.time.subCategory.format.button") }}
          </v-btn>
        </setting-item>
        <v-divider></v-divider>
      </div>
    </v-card>
  </div>
  <v-dialog v-model="dialogBox.isShown" width="auto">
    <v-card>
      <v-card-text>
        {{ dialogBox.message }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialogBox.isShown = false"
          >Close Dialog</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import SettingItem from "./components/SettingItem.vue";
import { TimeConfigProvider } from "@/utils/setting/TimeConfigProvider";
import { useLocale } from "vuetify/lib/framework.mjs";

export default defineComponent({
  name: "SettingView",
  components: {
    SettingItem,
  },
  setup() {
    const dialogBox = reactive({
      isShown: false,
      message: "",
    });
    const confirmSignoutDialog = ref(false);
    const timeFormatRef = ref(TimeConfigProvider.instance.timeFormat);
    const { t } = useLocale();

    function onSaveTimeformat() {
      TimeConfigProvider.instance.setTimeFormat(timeFormatRef.value);
      dialogBox.isShown = true;
      dialogBox.message = "Successfully set the Time Display Format.";
    }

    return {
      timeFormatRef,
      dialogBox,
      confirmSignoutDialog,
      onSaveTimeformat,
      t,
    };
  },
});
</script>
