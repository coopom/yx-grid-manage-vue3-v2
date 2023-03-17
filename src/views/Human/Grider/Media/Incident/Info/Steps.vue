<template>
    <div class="yx-human-media-incident-steps">
        <IncidentSteps :options="props.options" />
    </div>
</template>

<script setup>
import IncidentSteps from "@/components/IncidentSteps"
const props = defineProps({
    options: {
        type: Array,
        default: () => ([])
    }
});
</script>

<style lang="scss" scoped>
@include yx(human-media-incident-steps) {

}
</style>