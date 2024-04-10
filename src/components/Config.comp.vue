<template>
    <div>
        <v-dialog v-model="isDialogActive" width="500">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" prepend-icon="mdi-cog" text="Configuracion"> </v-btn>
            </template>
            <v-card>
                <v-card-title class="d-flex justify-center align-center">
                    <h2 class="letras">Configuración</h2>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col class="d-flex justify-center align-center">
                                <h3>configurar Pomodoro</h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="d-flex justify-center align-center" cols="2">
                                <div class="text-center">
                                    <v-menu v-model="menu" location="end">

                                        <template v-slot:activator="{ props }">
                                            <v-btn icon :color="colorSeleccionado" v-bind="props"></v-btn>
                                        </template>


                                        <v-card min-width="300">
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-btn @click="cambiarColor('red')" class="mr-2" icon
                                                            color="red"></v-btn>
                                                        <v-btn @click="cambiarColor('blue')" class="mr-2" icon
                                                            color="blue"></v-btn>

                                                        <v-btn @click="cambiarColor('green')" class="mr-2" icon
                                                            color="green"></v-btn>
                                                        <v-btn @click="cambiarColor('white')" class="mr-2" icon
                                                            color="white"></v-btn>
                                                        <v-btn @click="cambiarColor('yellow')" class="mr-2" icon
                                                            color="yellow"></v-btn>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-btn @click="cambiarColor('#FF5733')" class="mr-2" icon
                                                            color="#FF5733"></v-btn>
                                                        <v-btn @click="cambiarColor('#8E44AD')" class="mr-2" icon
                                                            color="#8E44AD"></v-btn>
                                                        <v-btn @click="cambiarColor('#2471A3')" class="mr-2" icon
                                                            color="#2471A3"></v-btn>
                                                        <v-btn @click="cambiarColor('#839192')" class="mr-2" icon
                                                            color="#839192"></v-btn>
                                                        <v-btn @click="cambiarColor('#283747')" class="mr-2" icon
                                                            color="#283747"></v-btn>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-btn @click="cambiarColor('#4A235A')" class="mr-2" icon
                                                            color="#4A235A"></v-btn>
                                                        <v-btn @click="cambiarColor('#A93226')" class="mr-2" icon
                                                            color="#A93226"></v-btn>
                                                        <v-btn @click="cambiarColor('#85C1E9')" class="mr-2" icon
                                                            color="#85C1E9"></v-btn>
                                                        <v-btn @click="cambiarColor('#6E2C00')" class="mr-2" icon
                                                            color="#6E2C00"></v-btn>
                                                        <v-btn @click="cambiarColor('#B2BABB')" class="mr-2" icon
                                                            color="#B2BABB"></v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card>
                                    </v-menu>
                                </div>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col class="mt-6" cols="5">
                                <v-text-field type="number" v-model="horas" label="Horas" />
                            </v-col>
                            <v-col class="mt-6" cols="5">
                                <v-text-field type="number" v-model="minutos" label="Minutos" />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="2"></v-col>
                            <v-col cols="5">
                                <v-text-field type="number" v-model="MinutosRecreoCorto" label="Minutos Recreo Corto" />
                            </v-col>
                            <v-col cols="5">
                                <v-text-field type="number" v-model="MinutosRecroLargo" label="Minutos Recreo Largo" />
                            </v-col>
                        </v-row>
                        <v-row>

                            <v-col class="d-flex justify-center align-center">
                                <v-btn @click="emitHacer()" text="Guardar"
                                    :disabled="!horas && !minutos && !MinutosRecreoCorto && !MinutosRecroLargo"></v-btn>
                                <!-- Agregamos :disabled="!horas || !minutos" para deshabilitar el botón si los campos están vacíos -->
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['cambiarHoras'])

const menu = ref(false)
const isDialogActive = ref(false)

const colorSeleccionado = ref('red');


const horas = ref('')
const minutos = ref('')
const MinutosRecreoCorto = ref('')
const MinutosRecroLargo = ref('')

function emitHacer() {
    if (horas.value !== '' || minutos.value !== '') {
        if (MinutosRecreoCorto.value === '') {
            MinutosRecreoCorto.value = 5;
        }
        if (MinutosRecroLargo.value === '') {
            MinutosRecroLargo.value = 15;
        }
        emit('cambiarHoras', horas.value, minutos.value, colorSeleccionado.value, MinutosRecreoCorto.value, MinutosRecroLargo.value);
        isDialogActive.value = false;
    }

}


const cambiarColor = (color) => {
    colorSeleccionado.value = color; // Establece el color seleccionado en colorSeleccionado.value
    return colorSeleccionado.value; // Devuelve el color seleccionado
}

</script>

<style scoped>
.letras {
    font-size: 2rem;
    font-family: cursive;
}
</style>
