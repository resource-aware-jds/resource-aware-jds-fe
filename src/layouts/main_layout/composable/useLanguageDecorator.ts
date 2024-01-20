import { SupportedLocalization } from "@/utils/setting/LocalConfigProvider";

export function useLanguageDecorator() {
  function languageDecorator(language: SupportedLocalization) {
    switch (language) {
      case SupportedLocalization.en:
        return "🇺🇸 EN";
      default:
        return "Unknown";
    }
  }

  return {
    languageDecorator,
  };
}
