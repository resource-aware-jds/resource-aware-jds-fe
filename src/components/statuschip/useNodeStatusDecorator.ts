import { I18nManager } from "@/locales/facade";
import { NodeStatus } from "@/models/node/node";
import { ref } from "vue";

interface DecorationDetail {
  title: string;
  color: string;
  icon: string;
}

export function useNodeStatusDecorator() {
  const icon = ref("mdi-question");
  const color = ref("grey");
  const title = ref("");

  function getNodeStatusDecoratorDetail(status: NodeStatus): DecorationDetail {
    const { t } = I18nManager.instance.i18n.global;
    const translation = t as (value: string) => string;

    switch (status) {
      case NodeStatus.Offline:
        return {
          title: translation("status.nodeStatus.offline"),
          color: "grey",
          icon: "mdi-signal-off",
        };
      case NodeStatus.Online:
        return {
          title: translation("status.nodeStatus.online"),
          color: "green",
          icon: "mdi-signal",
        };
      case NodeStatus.Unknown:
      default:
        return {
          title: translation("status.nodeStatus.unknown"),
          color: "grey",
          icon: "mdi-help",
        };
    }
  }

  function updateStatusValue(status?: number) {
    const result = getNodeStatusDecoratorDetail(status as NodeStatus);
    icon.value = result.icon;
    title.value = result.title;
    color.value = result.color;
  }

  return {
    icon,
    color,
    title,
    getNodeStatusDecoratorDetail,
    updateStatusValue,
  };
}
