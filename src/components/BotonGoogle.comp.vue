<template>
    <div>
        <v-btn @click="loginGoogle" prepend-icon="mdi-google">Iniciar con GOOGLE</v-btn>
    </div>
</template>

<script setup>
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { ref } from 'vue';

const emit = defineEmits(['usuario-logueado', 'idUser', 'newUser', 'loged']);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

const userName = ref('');
const userPhoto = ref('');
const userEmail = ref('');
const user = ref({});
const logueado = ref(false);



const registrar = async () => {
    try {
        const response = await fetch(`https://railway.app/project/681e9f43-bea6-405a-b5f3-c262e82e11d4/service/097dd457-0bc1-4ea9-96c2-05d17895d3fb?environmentId=0edc7a9d-20c9-4f64-9dcd-23eade88b02a/newUserGoogle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: userName.value,
                Email: userEmail.value,
                Photo: userPhoto.value,
            }),

        });
        // Puedes hacer algo con la respuesta si es necesario
        user.value = await response.json();

        const token = user.value.token;

        localStorage.setItem('Token', token);
        if (!user.value.user) {
            emit('newUser', user.value.newUser.UserId);
        } else {
            emit('idUser', user.value.user.UserId);

        }

    } catch (error) {
        console.log(error);
    }
};
const loginGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        userName.value = user.displayName;
        userPhoto.value = user.photoURL;
        userEmail.value = user.email;

        console.log(userName.value, userPhoto.value, userEmail.value);


        emit('usuario-logueado', userName.value, userPhoto.value, userEmail.value, logueado.value = true,);
        await registrar();


        // Llamar a la función registrar después de obtener los datos del usuario
    } catch (error) {
        console.log("Error en loginGoogle:", error);
    }
};

const logout = async () => {
    try {
        await auth.signOut();
        user.value = {};
        emit('usuario-logueado', '', '', '');
        emit('idUser', '');
        emit('newUser', '');
        logueado.value = false;
    } catch (error) {
        console.log("Error en logout:", error);
    }
};




</script>
