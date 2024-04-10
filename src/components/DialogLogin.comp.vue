<template>
    <div>

        <!-- Agrega el botón de "Tareas" en la barra de navegación -->
        <v-list-item v-if="!logueadoref" prepend-icon="mdi-login" title="Login" @click="dialogTareas"></v-list-item>
        <v-list-item v-if="logueadoref" prepend-icon="mdi-logout" title="LogOut" @click="logout"></v-list-item>

        <!-- Define el diálogo de tareas -->
        <v-dialog v-model="isDialogActive" width="80%">


            <v-card class="d-flex justify-center  card">

                <!-- Ingreso -->

                <v-card class="d-flex justify-center flex-column card-interna" v-if="login === 'login'">
                    <h3>Ingresar a Pomodoro App</h3>
                    <v-text-field v-model="EmailLogin" label=" Email"></v-text-field>
                    <v-text-field v-model="PasswordLogin" label="Contraseña" :type="Pass"><v-icon
                            v-if="Pass === 'password'" @click="mostarPass" class="ojo">mdi-eye-off</v-icon>
                        <v-icon v-else @click="mostarPass" class="ojo">mdi-eye</v-icon></v-text-field>
                    <v-btn color="primary" @click="loginNativo">Ingresar</v-btn>
                    <v-divider class="mb-5 mt-5"></v-divider>
                    <BotonGoogleComp class="mb-5" @newUser="idUser" @idUser="idUser" @usuario-logueado="capturaUser" />
                </v-card>

                <!-- Registro -->

                <v-card class="d-flex justify-center flex-column card-interna" v-else-if="login === 'register'">
                    <h3>Registrarse en Pomodoro App</h3>
                    <v-text-field :rules="[rules.required]" v-model="newUserName" label="Nombre"></v-text-field>
                    <v-text-field :rules="[rules.required, rules.email]" v-model="newEmail"
                        label="Email"></v-text-field>
                    <v-text-field class="mb-5"
                        hint="La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula"
                        :rules="[rules.required, rules.regex]" v-model="newPassword" label="Contraseña"
                        :type="Pass"><v-icon v-if="Pass === 'password'" @click="mostarPass"
                            class="ojo">mdi-eye-off</v-icon>
                        <v-icon v-else @click="mostarPass" class="ojo">mdi-eye</v-icon></v-text-field>
                    <v-btn class="mb-5" color="primary" @click="registrame">Registrarme</v-btn>

                </v-card>


                <v-divider class="mb-5"></v-divider>

                <v-list-item v-if="login === 'login'" prepend-icon="mdi-account-plus"
                    title="No tengo cuenta, Registrarme" @click="register"></v-list-item>
                <v-list-item v-if="login === 'register'" prepend-icon="mdi-account" title="Ya tengo cuenta"
                    @click="login = 'login'"></v-list-item>

            </v-card>
        </v-dialog>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import BotonGoogleComp from './BotonGoogle.comp.vue'
import { getAuth } from 'firebase/auth';
const auth = getAuth();


const logueadoref = ref(false);
const Pass = ref('password');
const user = ref('');
const userPh = ref('');
const userEm = ref('');
const idusuario = ref();
const EmailLogin = ref('');
const PasswordLogin = ref('');

const login = ref('login');


const newUserName = ref('');
const newEmail = ref('');
const newPassword = ref('');

const emit = defineEmits(['usuario-logueado', 'idUser']);

const token = localStorage.getItem('Token');



const loginNativo = async () => {
    try {
        const response = await fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Email: EmailLogin.value,
                Password: PasswordLogin.value
            })
        });
        const data = await response.json();
        if (data.token) {
            // Almacenar el token en el localStorage
            localStorage.setItem('token', data.token);

            // Otros pasos después de almacenar el token
            user.value = data.user.Name;
            userPh.value = data.user.Photo;
            userEm.value = data.user.Email;
            logueadoref.value = true;
            emit('usuario-logueado', user.value, userPh.value, userEm.value);
            emit('idUser', data.user.UserId);
            isDialogActive.value = false;


            EmailLogin.value = '';
            PasswordLogin.value = '';

        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



const registrame = async () => {
    try {
        const response = await fetch(`http://localhost:3000/newUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: newUserName.value,
                Email: newEmail.value,
                Password: newPassword.value,
                Photo: 'src/assets/perfil.png'
            })
        });
        const data = await response.json() // Asignamos los datos a la variable tareas

        // Limpiar los campos del formulario después de la petición exitosa
        newUserName.value = '';
        newEmail.value = '';
        newPassword.value = '';

        // Cerrar el diálogo después de la petición exitosa
        isDialogActive.value = false;

    } catch (error) {
        console.error('Error:', error);
    }
};



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


const logout = async () => {
    try {
        await auth.signOut();
        user.value = {};
        emit('usuario-logueado', '', '', '');
        emit('idUser', '');
        emit('newUser', '');
        logueadoref.value = false;
    } catch (error) {
        console.log("Error en logout:", error);
    }
};


function register() {
    login.value = 'register';
}



// Variable reactiva para controlar la apertura/cierre del diálogo
const isDialogActive = ref(false)


// Función para abrir el diálogo de tareas
function dialogTareas() {
    isDialogActive.value = true
}

function mostarPass() {
    if (Pass.value === 'password') {
        Pass.value = 'text';
    } else {
        Pass.value = 'password';
    }
}


const rules = {
    required: value => !!value || 'Required.',
    counter: value => value.length <= 20 || 'Max 20 characters',
    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
    },
    regex: value => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
        return pattern.test(value) || 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula'
    }
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

.ojo {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.card-interna {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    border: none;
}
</style>