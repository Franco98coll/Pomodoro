<script setup>
import { ref } from 'vue';
import soundFile from '../assets/bell-sound.mp3';
import { watch } from 'vue';

const props = defineProps({
    valor: {
        type: [Number, String],
        default: 0
    },
    color: {
        type: String,
        default: '#FF5733'
    },
    recreoC: {
        type: [Number, String],
        default: 5
    },
    recreoL: {
        type: [Number, String],
        default: 15
    }
});


const recreoCorto = ref(props.recreoC);
const recreoLargo = ref(props.recreoL);
const color = ref(props.color);
let countRecreo = 0;
const value = ref(convertirAHorasYMinutos(props.valor));
const valueRecreo = ref(convertirAHorasYMinutos(props.recreoC));
const valueRecreoLargo = ref(convertirAHorasYMinutos(props.recreoL));
const percentageRecreo = ref(100);
const percentageRecreoLargo = ref(100);
const percentage = ref(Number(100));
let recreo = ref(1);
let intervalId = null;


function convertirAHorasYMinutos(valor) {
    let valorNumerico = parseFloat(valor);
    if (!isNaN(valorNumerico)) {
        let horas = Math.floor(valorNumerico / 60);
        let minutos = valorNumerico % 60;
        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:00`;
    } else {
        return "00:00:00";
    }
}

function playPomodoro(hours, minutes, seconds) {
    if (countRecreo === 0) {
        countRecreo = 1;
    }
    if (!isPlaying) {
        isPlaying = true;

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        intervalId = setInterval(() => {
            totalSeconds--;

            let hoursLeft = Math.floor(totalSeconds / 3600);
            let minutesLeft = Math.floor((totalSeconds % 3600) / 60);
            let secondsLeft = totalSeconds % 60;

            // Formatear los valores para que siempre tengan dos dígitos
            hoursLeft = String(hoursLeft).padStart(2, '0');
            minutesLeft = String(minutesLeft).padStart(2, '0');
            secondsLeft = String(secondsLeft).padStart(2, '0');

            value.value = `${hoursLeft}:${minutesLeft}:${secondsLeft}`;

            if (totalSeconds <= 0) {
                clearInterval(intervalId);
                intervalId = null;
                playSound();
                value.value = convertirAHorasYMinutos(props.valor);
                percentageRecreo.value = 100;
                recreo.value = 2;
                if (countRecreo <= 3) {
                    setTimeout(() => {
                        playRecreo(Math.floor(props.recreoC), 0);
                    }, 4000);
                } else if (countRecreo === 4) {
                    countRecreo = 1;
                    recreo.value = 3;
                    setTimeout(() => {
                        playRecreoLargo(Math.floor(props.recreoL), 0);
                    }, 4000);
                }
            } console.log('recreo ', props.recreoC);
            if (isPlaying) {
                percentage.value = Math.round((totalSeconds / (hours * 3600 + minutes * 60 + seconds)) * 100);
            }
        }, 1000);
    }

}


function playRecreo(duration) {
    if (duration === 0) {
        duration = 5;
    }
    console.log('contador de recreos' + countRecreo);
    countRecreo++;
    let totalSeconds = duration * 60; // Convertir minutos a segundos

    // Mostrar el valor inicial antes de comenzar la cuenta atrás
    let minutosInicial = Math.floor(totalSeconds / 60);
    let segundosInicial = totalSeconds % 60;
    valueRecreo.value = `${String(minutosInicial).padStart(2, '0')}:${String(segundosInicial).padStart(2, '0')}`;

    setTimeout(() => {
        let intervalId = setInterval(() => {
            totalSeconds--;

            let minutosLeft = Math.floor(totalSeconds / 60);
            let segundosLeft = totalSeconds % 60;

            // Formatear los valores para que siempre tengan dos dígitos
            minutosLeft = String(minutosLeft).padStart(2, '0');
            segundosLeft = String(segundosLeft).padStart(2, '0');

            valueRecreo.value = `${minutosLeft}:${segundosLeft}`;

            if (totalSeconds <= 0) {
                clearInterval(intervalId);
                playSound();
                valueRecreo.value = convertirAHorasYMinutos(props.recreoC); // Reiniciar contador de recreo
                recreo.value = 1;
                isPlaying = false;
                percentage.value = 100;
                setTimeout(() => {
                    playPomodoro(Math.floor(props.valor / 60), props.valor % 60, 0); // Iniciar nuevo Pomodoro
                }, 4000); // Esperar 3 segundos antes de iniciar el nuevo Pomodoro
            }
            percentageRecreo.value = Math.round((totalSeconds / (duration * 60)) * 100);
        }, 1000);
    }, 3000);
}

function playRecreoLargo(duration) {
    console.log('contador de recreos' + countRecreo);
    countRecreo = 1;
    let totalSeconds = duration * 60;

    // Mostrar el valor inicial antes de comenzar la cuenta atrás
    let minutosInicial = Math.floor(totalSeconds / 60);
    let segundosInicial = totalSeconds % 60;
    valueRecreoLargo.value = `${String(minutosInicial).padStart(2, '0')}:${String(segundosInicial).padStart(2, '0')}`;

    let intervalId = setInterval(() => {
        totalSeconds--;

        let minutosLeft = Math.floor(totalSeconds / 60);
        let segundosLeft = totalSeconds % 60;

        // Formatear los valores para que siempre tengan dos dígitos
        minutosLeft = String(minutosLeft).padStart(2, '0');
        segundosLeft = String(segundosLeft).padStart(2, '0');

        valueRecreoLargo.value = `${minutosLeft}:${segundosLeft}`;

        if (totalSeconds <= 0) {
            clearInterval(intervalId);
            playSound();
            recreo.value = 1;
            reset();
        }
        percentageRecreoLargo.value = Math.round((totalSeconds / (duration * 60)) * 100);
    }, 1000);
}

function reset() {
    clearInterval(intervalId);
    intervalId = null;
    value.value = convertirAHorasYMinutos(props.valor);
    percentage.value = 100;
    valueRecreo.value = convertirAHorasYMinutos(props.recreoC); // 5 minutos en segundos
    percentageRecreo.value = 100;
    valueRecreoLargo.value = convertirAHorasYMinutos(props.recreoL); // 15 minutos en segundos
    percentageRecreoLargo.value = 100;
    recreo.value = 1;
    countRecreo = 1;
}

let isPlaying = false;

function playSound() {
    let sound = new Audio(soundFile);
    sound.play();
    console.log('sonando crack');
}

watch(() => props.valor, (newVal, oldVal) => {
    value.value = convertirAHorasYMinutos(newVal);
    percentage.value = 100;

    // Detener el temporizador actual si está en marcha
    if (isPlaying) {
        reset();
        isPlaying = false;
    }
});
watch(() => props.color, (newVal, oldVal) => {
    color.value = newVal;
});
watch(() => props.recreoC, (newVal, oldVal) => {
    if (!props.recreoC) {
        recreoCorto.value = 5;
    }
    recreoCorto.value = newVal;
    valueRecreo.value = convertirAHorasYMinutos(newVal);
    percentageRecreo.value = 100;
});
watch(() => props.recreoL, (newVal, oldVal) => {
    recreoLargo.value = newVal;
    valueRecreoLargo.value = convertirAHorasYMinutos(newVal);
    percentageRecreoLargo.value = 100;
});

</script>



<template>
    <div class="text-center d-flex flex-column justify-center align-center">
        <v-progress-circular v-if="recreo === 1" :rotate="360" :size="350" :width="15" :model-value="percentage"
            :color="color">
            <template v-slot:default>
                <div class="d-flex flex-column align-center ">
                    <h1 class="numeritos">{{ value }}</h1>
                    <div class="d-flex flex-row ">
                        <div class="puntos" :style="{ 'background-color': countRecreo >= 1 ? color : 'grey' }"></div>
                        <div class="puntos" :style="{ 'background-color': countRecreo >= 2 ? color : 'grey' }"></div>
                        <div class="puntos" :style="{ 'background-color': countRecreo >= 3 ? color : 'grey' }"></div>
                        <div class="puntos" :style="{ 'background-color': countRecreo === 4 ? color : 'grey' }"></div>
                    </div>
                </div>

            </template>
        </v-progress-circular>
        <v-progress-circular v-if="recreo === 2" :rotate="360" :size="350" :width="15" :model-value="percentageRecreo"
            color="#234434">

            <template v-slot:default>
                <h1 class="numeritos">{{ valueRecreo }}</h1>
            </template>
        </v-progress-circular>
        <v-progress-circular v-if="recreo === 3" :rotate="360" :size="350" :width="15"
            :model-value="percentageRecreoLargo" color="#534434">

            <template v-slot:default>
                <h1 class="numeritos">{{ valueRecreoLargo }}</h1>
            </template>
        </v-progress-circular>
        <v-btn class="mb-5" variant="tonal" @click="playPomodoro(Math.floor(props.valor / 60), props.valor % 60, 0)">
            <!-- <v-icon icon="mdi-play" /> -->
            <v-icon start>mdi-play </v-icon>
            Play
        </v-btn>
    </div>
</template>


<style scoped>
.v-progress-circular {
    margin: 1rem;
}

.puntos {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0.5rem;
    margin-top: 50px;
    margin-bottom: -100px;

}

.puntos-recreo {
    background-color: color;

}

.numeritos {
    font-size: 4rem;
    font-weight: bold;
    font-family: cursive;

}
</style>
