<template>
  <div>
    <!-- Agrega el botón de "Tareas" en la barra de navegación -->
    <v-list-item
      prepend-icon="mdi-check-circle-outline"
      title="Tareas"
      @click="dialogTareas"
    ></v-list-item>

    <!-- Define el diálogo de tareas -->
    <v-dialog v-model="isDialogActive" width="80%">
      <v-card class="d-flex justify-center align-center card">
        <v-btn v-if="UserId" @click="abrirAparte"
          ><v-icon>mdi-open-in-new</v-icon>Abrir Aparte</v-btn
        >
        <TareasComp />
        <!-- <v-card-text
          class="d-flex justify-center algin-center flex-column"
          v-else
        >
          <h3>Para Acceder a las Tareas deberas loguearte</h3>
          <div class="d-flex justify-center algin-center mt-5">
            <v-btn @click="isDialogActive = False"> Aceptar </v-btn>
          </div>
        </v-card-text> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import TareasComp from "./Tareas.comp.vue";
import BotonGoogleComp from "./BotonGoogle.comp.vue";
const emit = defineEmits(["abriraparte"]);

const props = defineProps({
  idDelUsuario: Number,
  abrirAparte: Boolean,
  idUser: Number,
});

const UserId = ref(props.idUser || props.idDelUsuario);

// Variable reactiva para controlar la apertura/cierre del diálogo
const isDialogActive = ref(false);
const aparte = ref(false);

// Función para abrir el diálogo de tareas
function dialogTareas() {
  isDialogActive.value = true;
}
const abrirAparte = () => {
  isDialogActive.value = false;
  aparte.value = true;
  emit("abriraparte", aparte.value);
};
watch(
  () => props.idDelUsuario,
  (newValue, oldValue) => {
    UserId.value = newValue;
  }
);
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
  font-family: "Arial", sans-serif;
}
</style>
