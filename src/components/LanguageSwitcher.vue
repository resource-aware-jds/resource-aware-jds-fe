<template>
  <v-btn-toggle
    rounded="xl"
    v-model:model-value="current"
    v-on:update:model-value="onChangeLanguage"
    :mandatory="true"
  >
    <v-btn
      v-for="(item, index) in Object.values(SupportedLocalization)"
      :key="index"
      :value="item"
    >
      {{ languageDecorator(item) }}
    </v-btn>
  </v-btn-toggle>
</template>

<script lang="ts">
import { useLanguageDecorator } from "@/layouts/main_layout/composable/useLanguageDecorator";
import {
  LocalConfigProvider,
  SupportedLocalization,
} from "@/utils/setting/LocalConfigProvider";
import { defineComponent } from "vue";
import { useLocale } from "vuetify/lib/framework.mjs";

export default defineComponent({
  name: "LanguageSwitcher",
  setup() {
    const { current } = useLocale();
    const { languageDecorator } = useLanguageDecorator();

    function onChangeLanguage(language: string | undefined) {
      if (!language) {
        return;
      }
      LocalConfigProvider.instance.setConfig(language);
    }

    return {
      current,
      languageDecorator,
      SupportedLocalization,
      onChangeLanguage,
    };
  },
});
</script>
