<template>
    <div>

        <!-- Agrega el botón de "Tareas" en la barra de navegación -->
        <div class="perfil" @click="dialogTareas">
            <v-list v-if="userName !== '' && userPhoto !== '' && userEmail !== ''">
                <v-list-item :prepend-avatar="userPhoto" :subtitle="userEmail" :title="userName"></v-list-item>
            </v-list>
        </div>


        <!-- Define el diálogo de tareas -->
        <v-dialog v-model="isDialogActive" width="80%">


            <v-card class="d-flex justify-center  card">

                <!-- Perfil -->

                <h3>Configurar Perfil</h3>

                <v-row>
                    <v-col cols="4">
                        <v-avatar size="200" class="d-flex justify-center" :size="size">
                            <img class="imag" :src="userPhoto" alt="">

                        </v-avatar>
                        <v-btn v-if="!cambiarAvatar" @click="ChangeAvatar">Cambiar Avatar</v-btn>
                        <div v-if="cambiarAvatar" class="d-flex justify-center align-center">
                            <v-file-input label="File input" @change="onFileChange"></v-file-input>
                            <v-icon @click="cerrarAvatar" class="mb-5">mdi-close</v-icon>
                            <v-btn @click="uploadFile">Subir</v-btn>
                        </div>

                    </v-col>
                    <v-col cols="6">
                        <h4>Nombre: {{ userName }} </h4>
                        <h4>Email: {{ userEmail }} </h4>


                    </v-col>
                </v-row>


            </v-card>
        </v-dialog>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import BotonGoogleComp from './BotonGoogle.comp.vue'
import { getAuth } from 'firebase/auth';
import axios from 'axios';
const auth = getAuth();

const props = defineProps({
    userName: String,
    userPhoto: String,
    userEmail: String,
})

let cambiarAvatar = ref(false);

const selectedFile = ref(null);

const userEmail = ref(props.userEmail);

const userPhoto = ref(props.userPhoto);

function capturaUser(userName, userPhoto, userEmail, logueado) {
    user.value = userName;
    userPh.value = userPhoto;
    userEm.value = userEmail;
    isDialogActive.value = false;
    logueadoref.value = logueado;
    emit('usuario-logueado', user.value, userPh.value, userEm.value);

}
function idUser(userId, newUser) {
    idusuario.value = newUser;
    idusuario.value = userId;
    emit('idUser', idusuario.value);
}

// Dentro del script setup
function ChangeAvatar() {
    cambiarAvatar.value = true;
}

function cerrarAvatar() {
    cambiarAvatar.value = false;
}

// Agrega una función para manejar el cambio de archivo
function onFileChange(event) {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    console.log('Archivo seleccionado:', file);
    selectedFile.value = file;
}

// Función para subir el archivo al backend
async function uploadFile() {
    try {
        const formData = new FormData();
        formData.append('file', selectedFile.value);
        formData.append('Email', userEmail.value); // Agrega el correo electrónico al formulario

        // Realiza la solicitud POST al backend
        const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data); // Maneja la respuesta del backend como desees
        const fullPath = response.data.path;
        const desiredPath = fullPath.replace('/usr/src/app/', ''); // Eliminar el prefijo no deseado
        userPhoto.value = desiredPath;
        console.log(userPhoto.value);
    } catch (error) {
        console.error('Error al subir el archivo:', error);
    }
}





// Variable reactiva para controlar la apertura/cierre del diálogo
const isDialogActive = ref(false)


// Función para abrir el diálogo de tareas
function dialogTareas() {
    isDialogActive.value = true
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

.perfil {
    cursor: pointer;

    margin-bottom: 10px;
    border-radius: 10px;
    color: #333;
    font-size: 1.2em;
    font-family: 'Arial', sans-serif;
    transition: 0.3s;
}

.perfil:hover {
    scale: 1.1;
}

.imag {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: block;
}
</style>