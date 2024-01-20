import { I18nManager } from "@/locales/facade";
import { TaskStatus } from "@/models/task/task";
import { ref } from "vue";

interface DecorationDetail {
  title: string;
  color: string;
  icon: string;
}

export function useTaskStatusDecorator() {
  const icon = ref("mdi-question");
  const color = ref("grey");
  const title = ref("");

  function getTaskStatusDecoratorDetail(status: TaskStatus): DecorationDetail {
    const { t } = I18nManager.instance.i18n.global;
    const translation = t as (value: string) => string;

    switch (status) {
      case TaskStatus.Created:
        return {
          title: translation("status.taskStatus.created"),
          color: "teal",
          icon: "mdi-folder-plus",
        };
      case TaskStatus.Distributed:
        return {
          title: translation("status.taskStatus.distributed"),
          color: "blue",
          icon: "mdi-file-tree",
        };
      case TaskStatus.Done:
        return {
          title: translation("status.taskStatus.done"),
          color: "green",
          icon: "mdi-check-circle",
        };
      case TaskStatus.Unknown:
      default:
        return {
          title: translation("status.taskStatus.unknown"),
          color: "grey",
          icon: "mdi-help",
        };
    }
  }

  function updateStatusValue(status?: number) {
    const result = getTaskStatusDecoratorDetail(status as TaskStatus);
    icon.value = result.icon;
    title.value = result.title;
    color.value = result.color;
  }

  return {
    icon,
    color,
    title,
    getTaskStatusDecoratorDetail,
    updateStatusValue,
  };
}
