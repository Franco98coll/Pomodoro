<script setup>
import { ref } from 'vue';
import Barra from './Barra.vue';
import Config from './Config.comp.vue';
import Tareas from './Tareas.comp.vue';
import DialogTareasComp from './DialogTareas.comp.vue';
import DialogFondoComp from './DialogFondo.comp.vue';
import BotonGoogle from './BotonGoogle.comp.vue';
import DialogLogin from './DialogLogin.comp.vue';
import DialogPerfil from './DialogPerfil.com.vue';
import { watch } from 'vue';
import DialogLoginComp from './DialogLogin.comp.vue';


const fondoFinal = ref('https://tomatempo.netlify.app/assets/_92af61e5-f9e6-4fb2-bd19-6e6f4543561b-q42Jgo-r.jpg');
const prueba = ref(0);

const valor = ref(25);
const cambio = ref(false);
const color1 = ref('#FF5733');
const abrirAparte = ref(false);
const userName = ref('');
const userPhoto = ref('');
const userEmail = ref('');
const idDelUsuario = ref();
const recreoC = ref(5);
const recreoL = ref(15);
const acepto = ref(false);


let intervalId = null;
let isPlaying = false;

function reset() {
    clearInterval(intervalId);
    intervalId = null;
}

function valorhandler(horas, minutos, color, MinutosRecreoCorto, MinutosRecroLargo) {
    reset(); // Detener el temporizador anterior antes de cambiar el valor
    valor.value = Number((horas * 60));
    valor.value += Number(minutos);
    recreoC.value = MinutosRecreoCorto;
    recreoL.value = MinutosRecroLargo;
    color1.value = color;
    isPlaying = false;
}

function abrirAparteHandler(aparte) {
    abrirAparte.value = aparte;
}

function cerrarAparte() {
    abrirAparte.value = false;
}
function capturaFondo(fondo) {
    fondoFinal.value = fondo;
    cambio.value = true;
}

function capturaUser(user, userPh, userEm) {
    userName.value = user;
    userPhoto.value = userPh;
    userEmail.value = userEm;

}
function userId(idusuario) {
    idDelUsuario.value = idusuario
}



watch(() => fondoFinal.value, (newValue, oldValue) => {
    fondoFinal.value = newValue;
    prueba.value++;
});

function aceptacion() {
    acepto.value = true;
}
</script>

<template>
    <div v-if="acepto == false">
        <v-card class="centrar">
            <v-container>
                <v-row class="d-flex flex-row">
                    <v-col cols="3"></v-col>
                    <v-col class="color" cols="6">
                        <img src="https://tomatempo.netlify.app/assets/preview-CcAXIXJD.png" alt="" width="50px">
                        <h3>Esta es un version Beta de esta aplicacion por lo tanto algunas funcionalidades
                            podrian presentar errores. <br> Muchas gracias por su paciencia</h3>
                        <v-btn @click="aceptacion"><v-icon>mdi-check</v-icon> Estoy de acuerdo</v-btn>
                    </v-col>
                    <v-col cols="3"></v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
    <div v-if="acepto">
        <v-layout>
            <v-navigation-drawer expand-on-hover rail>

                <DialogPerfil v-if="userName !== '' && userPhoto !== '' && userEmail !== ''" :userName="userName"
                    :userPhoto="userPhoto" :userEmail="userEmail" />

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <DialogTareasComp :idDelUsuario="idDelUsuario" @abriraparte="abrirAparteHandler"
                        :abrirAparte="abrirAparte" @closeDialog="cerrarAparte" />

                    <DialogFondoComp @cambiar-fondo="capturaFondo" />

                    <DialogLogin id="boton-google-container" @usuario-logueado="capturaUser" @idUser="userId" />

                    <!-- <BotonGoogle @newUser="idUser" @idUser="idUser" @usuario-logueado="capturaUser" /> -->

                </v-list>
            </v-navigation-drawer>

            <v-main>

                <div
                    :style="{ backgroundImage: 'url(' + fondoFinal + ')', backgroundSize: 'cover', backgroundPosition: '50%', backgroundPositionY: '70%' }">
                    <h1 class="letras">Tomatempo</h1>
                    <h5>pomodoro</h5>
                    <div class="card">
                        <v-container fluid>
                            <v-row class="celu">
                                <v-col cols="8" class="d-flex flex-column justify-center align-center">
                                    <Barra :recreoC="recreoC" :recreoL="recreoL" :color="color1" :valor="valor" />
                                    <Config @cambiar-horas="valorhandler">
                                    </Config>

                                </v-col>
                                <v-col v-if="abrirAparte === true" cols="4">
                                    <v-card>
                                        <div class="d-flex justify-end">
                                            <v-btn color="red" @click="cerrarAparte"><v-icon>mdi-close</v-icon></v-btn>
                                        </div>
                                        <Tareas v-if="idDelUsuario" :idDelUsuario="idDelUsuario" />
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>


                    </div>
                </div>

            </v-main>

        </v-layout>
    </div>

</template>

<style scoped>
.letras {
    font-size: 3rem;
    font-family: cursive;
}

.celu {
    display: flex;
    justify-content: center;
    align-items: center;
}

#boton-google-container {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding-left: 5px;

}

.centrar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #121212;
}

.color {
    background-color: #121212;
    color: white;
    padding: 10px;
    border-radius: 10px;
}

.color h3 {
    margin: 20px;
}





@media only screen and (max-width: 625px) {
    .celu {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }


}
</style>
