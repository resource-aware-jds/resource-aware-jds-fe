<template>
  <div class="text-left flex flex-column gap-3">
    <v-form
      ref="entryForm"
      validate-on="submit"
      @submit.prevent="onPressSubmit"
    >
      <v-text-field
        class="rounded-2xl"
        clearable
        :label="t('page.login.placeholder.email')"
        :rules="[rules.required, rules.email]"
        v-model:model-value="data.email"
      ></v-text-field>
      <v-text-field
        clearable
        class="rounded-3xl"
        type="password"
        :label="t('page.login.placeholder.password')"
        :rules="[rules.required]"
        v-model:model-value="data.password"
      ></v-text-field>
      <v-btn class="w-full rounded-2xl" type="submit" variant="outlined">
        {{ t("page.login.button.signIn") }}
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { reactive } from "vue";
import { defineComponent } from "vue";
import { SubmitEventPromise, useLocale } from "vuetify/lib/framework.mjs";

type onSubmit = (email: string, password: string) => Promise<void>;

export default defineComponent({
  name: "EmailAndPasswordInput",
  props: {
    onSubmit: {
      type: Function as PropType<onSubmit>,
      default: () => {},
    },
  },
  setup(props) {
    const { t } = useLocale();
    const rules = reactive({
      required: (value: string) => !!value || "Required.",
      email: (value: string) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    });
    const data = reactive({
      email: "",
      password: "",
    });

    async function onPressSubmit(event: SubmitEventPromise) {
      const resultEvent = await event;
      if (!resultEvent.valid) {
        return;
      }
      props.onSubmit(data.email, data.password);
    }

    return {
      data,
      rules,
      t,
      onPressSubmit,
    };
  },
});
</script>
