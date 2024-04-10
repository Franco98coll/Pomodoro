<script setup>
import { ref } from 'vue';

const emit = defineEmits(['cambiarFondo']);

const fondo = ref('');

function guardarFondo(src) {
    fondo.value = src;
}
const isDialogActive = ref(false);

function emitFondo() {
    emit('cambiarFondo', fondo.value, isDialogActive);

}
</script>

<template>
    <div>
        <v-container>
            <v-row class="d-flex flex-row">
                <v-col class="mb-5" cols="6">
                    <h1 class="letras">Fondos</h1>
                    <v-btn :disabled="!fondo" @click="emitFondo" class="mb-5">Aplicar Fondo</v-btn>

                </v-col>
                <v-col v-if="fondo" cols="6">
                    <img :src="fondo" class="imagenes" alt="">
                </v-col>
            </v-row>
            <v-card class="espacio">
                <v-row>
                    <v-col cols="12">
                        <img class="imagenes" src="../assets/fondos/_1e66e314-26f3-4905-85de-abab7c9775c9.jpg" alt=""
                            @click="guardarFondo('../assets/fondos/_1e66e314-26f3-4905-85de-abab7c9775c9.jpg')">
                        <img class="imagenes" src="../assets/fondos/_00081e4f-0d49-425d-9071-374010469a99.jpg" alt=""
                            @click="guardarFondo('/src/assets/fondos/_00081e4f-0d49-425d-9071-374010469a99.jpg')">
                        <img class="imagenes" src="../assets/fondos/_047de72b-db57-415a-a4bc-5f2173aae35e.jpg" alt=""
                            @click="guardarFondo('/src/assets/fondos/_047de72b-db57-415a-a4bc-5f2173aae35e.jpg')">
                        <img @click="guardarFondo('/src/assets/fondos/_0c7337e2-19e4-4dbb-8b58-c37c80d41113.jpg')"
                            class="imagenes" src="../assets/fondos/_0c7337e2-19e4-4dbb-8b58-c37c80d41113.jpg" alt="">

                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <img @click="guardarFondo('/src/assets/fondos/_1e3d7696-ecd2-43f7-9dca-ad3e12da666e.jpg')"
                            class="imagenes" src="../assets/fondos/_1e3d7696-ecd2-43f7-9dca-ad3e12da666e.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_214df04b-5aff-407c-a705-947f6eec4713.jpg')"
                            class="imagenes" src="../assets/fondos/_214df04b-5aff-407c-a705-947f6eec4713.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_24d2e8a8-9752-4ba4-aeb5-c41da22ba057.jpg')"
                            class="imagenes" src="../assets/fondos/_24d2e8a8-9752-4ba4-aeb5-c41da22ba057.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_267af400-67fd-4680-826e-b2e3e4325b94.jpg')"
                            class="imagenes" src="../assets/fondos/_267af400-67fd-4680-826e-b2e3e4325b94.jpg" alt="">

                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <img @click="guardarFondo('/src/assets/fondos/_33168ceb-28b1-4863-a291-69194169bc58.jpg')"
                            class="imagenes" src="../assets/fondos/_33168ceb-28b1-4863-a291-69194169bc58.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_43727ba6-f326-40ae-80f9-ed6175602d81.jpg')"
                            class="imagenes" src="../assets/fondos/_43727ba6-f326-40ae-80f9-ed6175602d81.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_44ab7d3e-8b34-4240-8c68-ce0db6510742.jpg')"
                            class="imagenes" src="../assets/fondos/_44ab7d3e-8b34-4240-8c68-ce0db6510742.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_4b11160a-ab19-4b16-ba55-0d28dba59acb.jpg')"
                            class="imagenes" src="../assets/fondos/_4b11160a-ab19-4b16-ba55-0d28dba59acb.jpg" alt="">

                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <img @click="guardarFondo('/src/assets/fondos/_65000bce-2396-4fce-a56d-64e52e246750.jpg')"
                            class="imagenes" src="../assets/fondos/_65000bce-2396-4fce-a56d-64e52e246750.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_6e4c2d8f-86d7-4d4b-82a8-b4e05f2456e8.jpg')"
                            class="imagenes" src="../assets/fondos/_6e4c2d8f-86d7-4d4b-82a8-b4e05f2456e8.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_73668546-b08e-48c3-b50a-dacfacc547b9.jpg')"
                            class="imagenes" src="../assets/fondos/_73668546-b08e-48c3-b50a-dacfacc547b9.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_7e3efacc-48a1-4a83-b3db-8ee5aab65af0.jpg')"
                            class="imagenes" src="../assets/fondos/_7e3efacc-48a1-4a83-b3db-8ee5aab65af0.jpg" alt="">

                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <img @click="guardarFondo('/src/assets/fondos/_87cd0839-d4d8-4a37-8625-9881e58ee544.jpg')"
                            class="imagenes" src="../assets/fondos/_87cd0839-d4d8-4a37-8625-9881e58ee544.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_91807d84-0ae6-4adc-8fc4-b60c2be138a4.jpg')"
                            class="imagenes" src="../assets/fondos/_91807d84-0ae6-4adc-8fc4-b60c2be138a4.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_92af61e5-f9e6-4fb2-bd19-6e6f4543561b.jpg')"
                            class="imagenes" src="../assets/fondos/_92af61e5-f9e6-4fb2-bd19-6e6f4543561b.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_a7dec867-f4ac-4689-b8de-05e8bca63c98.jpg')"
                            class="imagenes" src="../assets/fondos/_a7dec867-f4ac-4689-b8de-05e8bca63c98.jpg" alt="">

                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <img @click="guardarFondo('/src/assets/fondos/_afb6035e-b53c-4ff4-873d-e709b063bc2d.jpg')"
                            class="imagenes" src="../assets/fondos/_afb6035e-b53c-4ff4-873d-e709b063bc2d.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_b4a0f08d-4d44-47f8-9203-9ebaa13af3e2.jpg')"
                            class="imagenes" src="../assets/fondos/_b4a0f08d-4d44-47f8-9203-9ebaa13af3e2.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_b5dba3f6-fe36-46dc-aa16-78b528ec649c.jpg')"
                            class="imagenes" src="../assets/fondos/_b5dba3f6-fe36-46dc-aa16-78b528ec649c.jpg" alt="">
                        <img @click="guardarFondo('/src/assets/fondos/_ba42e3f8-3461-4db3-8735-7d76e5ad70a7.jpg')"
                            class="imagenes" src="../assets/fondos/_ba42e3f8-3461-4db3-8735-7d76e5ad70a7.jpg" alt="">

                    </v-col>
                </v-row>

            </v-card>
        </v-container>
    </div>
</template>


<style scoped>
.espacio {
    height: 300px;
    overflow-y: auto;
}

.imagenes {
    width: 200px;
    object-fit: cover;
    border-radius: 10px;
    aspect-ratio: 16/9;
    margin: 10px;
}

.imagenes:hover {
    cursor: pointer;
    scale: 1.1;
}
</style>