<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-box-title">
                <span>{{ title }}</span>
            </div>
            <el-form :model="formModel" :rules="rules" ref="loginRef" label-width="0px" class="login-box-content">
                <el-form-item prop="username">
                    <el-input placeholder="用户名" v-model="formModel.username" tabindex="-1" disabled>
                        <template #prepend>
                            <el-button :icon="User" tabindex="-1"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="accessToken">
                    <el-input placeholder="密码" v-model="formModel.accessToken" type="password" @keyup.enter="submitForm" tabindex="1" autofocus>
                        <template #prepend>
                            <el-button :icon="Lock" tabindex="-1"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm" tabindex="-1">登 录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue';
import { login } from '../api/account';
import { useUserInfoStore } from '../store/user-info';
import { disposeAllStores } from '~/plugins/pinia';

const title = import.meta.env.VITE_APP_TITEL;

const route = useRoute();
const router = useRouter();
const userInfoStore = useUserInfoStore();
onMounted(() => {
    userInfoStore.clear();
    disposeAllStores();
});

const formModel = reactive({
    username: userInfoStore.username,
    accessToken: '',
});
const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    accessToken: [{ required: true, message: '请输入AccessToken', trigger: 'blur' }],
};

const loginRef = ref();
const submitForm = async () => {
    try {
        await loginRef.value.validate();
        try {
            userInfoStore.accessToken = formModel.accessToken;
            await login();
            userInfoStore.saveToken(formModel.accessToken);
            router.push(route.query.redirectPath ?? '/');
            
            ElMessage.success('登录成功');
        } catch (error) {
            ElMessage.error('登录失败');
            console.error(error);
        }
    } catch {}
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(45, 58, 75);
}

.login-box {
    width: 360px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    margin-bottom: 8vh;
}

.login-box-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(238, 238, 238);
    border-bottom: 1px solid #ddd;
    position: relative;
}

.login-box-content {
    padding: 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
