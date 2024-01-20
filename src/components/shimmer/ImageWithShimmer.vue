<template>
  <img
    v-if="!isImageLoadingError"
    :class="computedClass"
    :src="src"
    :alt="alt"
    @load="onImageDoneLoading"
    @error="onImageLoadingError"
  />
  <Shimmer
    :class="`w-${width} h-${height} ${imgClass} `"
    v-if="isImageLoading"
  ></Shimmer>
  <v-icon
    :class="imgClass"
    v-if="isImageLoadingError"
    :icon="fallbackIcon"
  ></v-icon>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Shimmer from "./Shimmer.vue";
export default defineComponent({
  name: "ImageWithShimmer",
  components: {
    Shimmer,
  },
  setup(props) {
    const isImageLoading = ref(true);
    const isImageLoadingError = ref(false);

    const computedClass = computed(() => {
      if (isImageLoading.value) {
        return `${props.imgClass} w-0 h-0`;
      }

      return `${props.imgClass} w-${props.width} h-${props.height}`;
    });

    const onImageDoneLoading = () => {
      isImageLoading.value = false;
    };

    const onImageLoadingError = () => {
      onImageDoneLoading();
      isImageLoadingError.value = true;
    };

    return {
      isImageLoading,
      isImageLoadingError,
      computedClass,
      onImageDoneLoading,
      onImageLoadingError,
    };
  },
  props: {
    imgClass: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    height: {
      type: String,
    },
    width: {
      type: String,
    },
    fallbackIcon: {
      type: String,
      default: "mdi-help",
    },
  },
});
</script>
