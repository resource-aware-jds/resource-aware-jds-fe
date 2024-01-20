export interface MessageBoxController {
  text: string;
  icon: string;
  type: "error" | "success" | "warning" | "info" | undefined;
}
