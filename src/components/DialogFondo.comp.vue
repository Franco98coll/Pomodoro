<template>
    <div>

        <!-- Agrega el botón de "Tareas" en la barra de navegación -->
        <v-list-item prepend-icon="mdi-image-outline" title="Fondos" @click="dialogTareas"></v-list-item>

        <!-- Define el diálogo de tareas -->
        <v-dialog v-model="isDialogActive" width="80%">
            <v-card class="d-flex justify-center align-center card">
                <FondosComp @cambiar-fondo="capturaFondo" />
            </v-card>
        </v-dialog>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import FondosComp from './Fondos.comp.vue';

const emit = defineEmits(['cambiar-fondo'])

const fondocapt = ref('')

// Variable reactiva para controlar la apertura/cierre del diálogo
const isDialogActive = ref(false)


// Función para abrir el diálogo de tareas
function dialogTareas() {
    isDialogActive.value = true
}

function capturaFondo(fondo) {
    fondocapt.value = fondo;
    emit('cambiar-fondo', fondo)
    isDialogActive.value = false;
}

</script>


<style scoped>
/* Estilos para el diálogo de tareas */
.card {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
    color: #333;
    font-size: 1.2em;
    font-family: 'Arial', sans-serif;

}
</style>