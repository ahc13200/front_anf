<template>
    <div class="row">
        <div class="col-xxl-12">
            <div class="card">
                <div class="card-body">
                    <div class="live-preview">
                        <form action="javascript:void(0);" style="font-size: 1rem">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="firstNameinput" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" placeholder="Enter your firstname"
                                               id="firstNameinput" v-model="person.first_name">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="lastNameinput" class="form-label">Apellido</label>
                                        <input type="text" class="form-control" placeholder="Enter your lastname"
                                               id="lastNameinput" v-model="person.last_name">
                                    </div>
                                </div>
                                <!--end col-->
                                <!--end col-->
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="phonenumberInput" class="form-label">Edad</label>
                                        <input type="tel" class="form-control" placeholder="Enter your age"
                                               id="phonenumberInput" v-model="person.age">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="emailidInput" class="form-label">Correo</label>
                                        <input type="email" class="form-control" placeholder="example@gamil.com"
                                               id="emailidInput" v-model="person.email">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="ForminputState" class="form-label">Sexo</label>
                                        <select id="ForminputState" class="form-select" v-model="person.sex"
                                                data-choices=""
                                                data-choices-sorting="true">
                                            <option selected="">Masculino</option>
                                            <option selected="">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-12">
                                    <div class="text-end">
                                        <button type="button" @click="update" class="btn btn-primary " style="cursor: pointer;">Enviar
                                        </button>
                                    </div>
                                </div>
                                <!--end col-->
                            </div>
                            <!--end row-->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import axios from '@/config/axios/axios.ts'
    import {useAxios} from '@vueuse/integrations/useAxios'
    import {inject, reactive, ref} from 'vue'

    const person = reactive({first_name: "", last_name: "", sex: "", age: 0, email: "", id: null})
    const refresh = inject('refresh')
    let action = ref("create")

    function sendPerson() {
        const {data, isFinished} = useAxios('/services/person', {method: 'POST', data: person}, axios, {
            immediate: true,
            onSuccess: async () => {
                await refresh()

            },
            onFinish: () => {
                person.id = null
                person.last_name = ""
                person.first_name = ""
                person.age = null
                person.email = ""
                person.sex = ""
            }
        })
    }

    function updatePerson() {
        axios.put('services/person/' + person.id,person).then(async (data) => {
            await refresh()
            person.id = null
            person.last_name = ""
            person.first_name = ""
            person.age = null
            person.email = ""
            person.sex = ""
        })
    }

    function loadPerson(id) {
        axios.get('services/person/' + id).then(data => {
            person.first_name = data.data.first_name
            person.last_name = data.data.last_name
            person.age = data.data.age
            person.email = data.data.email
            person.sex = data.data.sex
            person.id = data.data.id
            action.value = "update"
        })
    }

    function update() {
        if (action.value == "update") {
            updatePerson()
        }
        else
            sendPerson()
    }

    defineExpose({loadPerson})

</script>

<style scoped>
    .btn {
        color: var(--vz-btn-hover-color) !important;
        background-color: var(--vz-btn-hover-bg) !important;
        border-color: var(--vz-btn-hover-border-color) !important;
    }
</style>