<template>
    <div class="main-content">
        <div class="page-content">
            <div class="content-fluid">
                <v-form ref="formPerson"/>
                <v-table ref="tablePerson"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import {ref, provide} from 'vue'
    import VForm from "./modules/dashboard/components/VForm.vue";
    import VTable from "./modules/dashboard/components/VTable.vue";

    const tablePerson = ref(null)
    const formPerson = ref(null)

    function refresh() {
        tablePerson.value.loadData()
    }

    function loadPerson(id) {
        formPerson.value.loadPerson(id)
    }


    provide('refresh',refresh)
    provide('loadPerson',loadPerson)

</script>
