<script setup>
import { ref } from 'vue';

const clicked = ref(false);
const descripcionTarea = ref('');
const status = ref('true');
const tareas = ref([]);

const props = defineProps({
    UserId: Number,
    idDelUsuario: Number
});


const userId = ref(props.UserId || props.idDelUsuario);

const tareaToggle = () => {
    clicked.value = !clicked.value;
};

const toggleEditing = (tarea) => {
    tarea.editing = !tarea.editing;
};

const agregarTarea = async () => {
    try {
        const response = await fetch('https://serverpomodoro-production.up.railway.app/tarea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: userId.value,
                Description: descripcionTarea.value,
                Status: status.value
            })
        });
        const data = await response.json();
        console.log(data);
        clicked.value = !clicked.value;
        obtenerTareas(); // Llamamos a la función obtenerTareas para actualizar la lista de tareas
    } catch (error) {
        console.error('Error:', error);
    }
};

const toggleStatus = tarea => {
    tarea.Status = tarea.Status === 'true' ? 'false' : 'true';
};

const obtenerTareas = async () => {
    try {
        const response = await fetch(`https://serverpomodoro-production.up.railway.app/tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUsuario: userId.value
            })
        });
        const data = await response.json() // Asignamos los datos a la variable tareas
        tareas.value = data;
    } catch (error) {
        console.error('Error:', error);
    }
};


obtenerTareas(); // Llamamos a la función obtenerTareas cuando el componente se monta

const borrarTarea = async tarea => {
    try {
        const response = await fetch(`https://serverpomodoro-production.up.railway.app/tarea`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TaskId: tarea.TaskId
            })
        });
        const data = await response.json();

        obtenerTareas(); // Llamamos a la función obtenerTareas para actualizar la lista de tareas

    } catch (error) {
        console.error('Error:', error);
    }
};

const updateTarea = async tarea => {
    try {
        const response = await fetch(`https://serverpomodoro-production.up.railway.app/tarea`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TaskId: tarea.TaskId,
                Description: tarea.Description,
            })
        });
        const data = await response.json();
        tarea.editing = !tarea.editing;
        obtenerTareas(); // Llamamos a la función obtenerTareas para actualizar la lista de tareas
    } catch (error) {
        console.error('Error:', error);
    }
};

</script>

<template>
    <div class="tareas">
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <h1 class="letras">Tareas</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">

                    <v-btn v-if="clicked === false" @click="tareaToggle" variant="outlined">AGREGAR TAREA</v-btn>


                    <v-card v-if="clicked === true" class="d-flex flex-column pt-5  ">
                        <div class="d-flex flex-column  ">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="descripcionTarea" label="Descripcion de la tarea"
                                        variant="outlined"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-card-actions class="d-flex justify-center align-center">
                                <v-btn :disabled="!descripcionTarea" @click="agregarTarea" variant="outlined"
                                    color="primary">Agregar</v-btn>
                                <v-btn variant="outlined" v-if="clicked === true" @click="tareaToggle"
                                    color="error">Cancelar</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <div class="tareas2">
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-card variant="tonal" class="d-flex align-center mb-4" v-for="(tarea, index) in tareas"
                            :key="tarea.TaskId">
                            <template v-if="!tarea.editing">
                                <v-card-text class="d-flex align-center">
                                    <v-checkbox :model-value="tarea.Status === 'false'" @click="toggleStatus(tarea)"
                                        class="mr-6 mt-6"></v-checkbox>
                                    <h2>
                                        <span v-if="tarea.Status === 'true'">{{ tarea.Description }}</span>
                                        <del v-else>{{ tarea.Description }}</del>
                                    </h2>
                                </v-card-text>
                            </template>
                            <v-text-field class="mt-6" v-else v-model="tarea.Description"
                                variant="outlined"></v-text-field>
                            <v-btn class="mr-2" icon="mdi-pencil" v-if="!tarea.editing"
                                @click="toggleEditing(tarea)"></v-btn>
                            <v-btn class="mr-2" icon="mdi-content-save" v-else @click="updateTarea(tarea)"></v-btn>
                            <v-btn class="mr-2" icon="mdi-delete" @click="borrarTarea(tarea)"></v-btn>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

    </div>
</template>



<style scoped>
.tareas {
    height: 100%;
    min-height: 75vh;
    max-height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 100;

}

.tareas2 {

    height: 100%;
    overflow-y: auto;

}
</style>
