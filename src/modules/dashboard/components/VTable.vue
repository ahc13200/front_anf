<template>
    <div class="row">
        <div class="col-xxl-8">

            <div class="card">
                <!-- Border spinner -->

                <table class="table table-nowrap" style="font-size: 1rem">
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col" v-if="!lgAndSmaller">Apellidos</th>
                        <th scope="col" v-if="!lgAndSmaller">Edad</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Nacionalidad</th>
                        <th scope="col">Acciones</th>
                    </tr>
                    </thead>
                    <div v-if="loading" class="spinner-border text-primary" role="status" style="align-items:center ">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <tbody v-if="!loading">
                    <tr v-for="(item,index) in list" :key="index">
                        <td scope="row">{{item.first_name}}</td>
                        <td v-if="!lgAndSmaller">{{item.last_name}}</td>
                        <td v-if="!lgAndSmaller">{{item.age}}</td>
                        <td>{{item.sex}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.country}}</td>
                        <td>
                            <div class="hstack gap-3 flex-wrap">
                                <a href="javascript:void(0);" @click="loadPersonTable(item.id)"
                                   class="link-success fs-15"><i class="bx bx-message-rounded-minus"></i></a>
                                <a href="javascript:void(0);" @click="deletePerson(item.id)"
                                   class="link-danger fs-15"><i class="bx bx-angry"></i></a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-xxl-4" style="font-size: 1rem">
            <div class="card">
                <div class="card-header">
                    <h4>Cálculos</h4>
                </div>
                <div v-if="calc" class="card-body">
                    <p>Promedio: {{calc.prom}}</p>
                    <p>Cantidad de personas por sexo</p>
                    <p>Masculino: {{calc.cantMasc}}</p>
                    <p>Femenino: {{calc.cantFem}}</p>
                    <p>Mayor Edad: {{calc.nameMay}}</p>
                    <p>Menor Edad: {{calc.nameMen}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {inject, onMounted, ref} from 'vue'
    import axios from '@/config/axios/axios.ts'

    import {useBreakpoints} from '@vueuse/core'

    const breakpoints = useBreakpoints({
        mobile: 600,
    })
    const lgAndSmaller = breakpoints.smallerOrEqual('mobile') // lg and smaller
    // use this way:
    let list = ref([])
    let calc = ref([])
    let loading = ref(false);
    const loadPerson = inject('loadPerson')
    let responsive = false


    let isFinished = ref(false);

    function loadData() {
        // use this way:
        loading.value = true
        axios.get('/services/person').then(data => {
            list.value = data.data
            loading.value = false
        })
        axios.get('/services/person/calculos').then(data => {
            console.log('calc data', data)
            calc.value = data.data
            loading.value = false
        })
    }


    function deletePerson(id) {
        axios.delete('services/person/' + id).then(data => {
            console.log('estoy eliminando', data)
            loadData()
        })
    }

    function loadPersonTable(id) {
        console.log("estoy cargando el id", id)
        loadPerson(id)
    }

    defineExpose({loadData})
    onMounted(() => {
        loadData()
    })

</script>

<style scoped>

</style>
