import { I18nManager } from "@/locales/facade";
import { JobStatus } from "@/models/job/job";
import { ref } from "vue";

interface DecorationDetail {
  title: string;
  color: string;
  icon: string;
}

export function useJobStatusDecorator() {
  const icon = ref("mdi-question");
  const color = ref("grey");
  const title = ref("");

  function getJobStatusDecoratorDetail(status: JobStatus): DecorationDetail {
    const { t } = I18nManager.instance.i18n.global;
    const translation = t as (value: string) => string;

    switch (status) {
      case JobStatus.Created:
        return {
          title: translation("status.jobStatus.created"),
          color: "teal",
          icon: "mdi-folder-plus",
        };
      case JobStatus.Distributing:
        return {
          title: translation("status.jobStatus.distributing"),
          color: "blue",
          icon: "mdi-file-tree",
        };
      case JobStatus.Done:
        return {
          title: translation("status.jobStatus.done"),
          color: "green",
          icon: "mdi-check-circle",
        };
      case JobStatus.Unknown:
      default:
        return {
          title: translation("status.jobStatus.unknown"),
          color: "grey",
          icon: "mdi-help",
        };
    }
  }

  function updateStatusValue(status?: number) {
    const result = getJobStatusDecoratorDetail(status as JobStatus);
    icon.value = result.icon;
    title.value = result.title;
    color.value = result.color;
  }

  return {
    icon,
    color,
    title,
    getJobStatusDecoratorDetail,
    updateStatusValue,
  };
}
