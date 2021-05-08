<template>
  <el-form
    ref="registerForm"
    :model="registerUser"
    :rules="registerRules"
    label-width="100px"
    class="registerForm sign-up-form"
  >
    <el-form-item label="用户名" prop="name">
      <el-input
        v-model="registerUser.name"
        placeholder="Enter username..."
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="registerUser.email"
        placeholder="Enter Email..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="registerUser.password"
        type="password"
        placeholder="Enter Password..."
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
        v-model="registerUser.password2"
        type="password"
        placeholder="Enter Password2..."
      ></el-input>
    </el-form-item>
    <el-form-item label="选择身份">
      <el-select v-model="registerUser.role" placeholder="请选择身份...">
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="用户" value="user"></el-option>
        <el-option label="游客" value="visitor"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="handleRegister('registerForm')"
        type="primary"
        class="submit-btn"
        >注册</el-button
      >
    </el-form-item>
    <!-- 找回密码 -->

  </el-form>
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router"

export default {
  props: {
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true,
    },
  },
  setup(props:any) {
    // @ts-ignore
    const { ctx } = getCurrentInstance();

		const router = useRouter()

    // 触发注册方法
    const handleRegister = (formName: string) => {
      console.log(formName)
      // console.log(ctx)
      ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          // alert("submit!");
          ctx.$axios.post("/api/v1/auth/register", props.registerUser).then((res:any) =>{
						// 注册成功
						ctx.$message({
							message: "注册成功",
							type: "success"
						})

						// 路由跳转 
						router.push('/')
					})
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };


    return { handleRegister };
  },
};
</script>

<style scoped>
</style>