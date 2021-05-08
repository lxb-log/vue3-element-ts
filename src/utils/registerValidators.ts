import { ref } from "vue"

interface RegisterUser {
  name: string;
  email: string;
  password: string;
  password2: string;
  role: string;
}

export const registerUser = ref<RegisterUser>({
  name: '',
  email: '',
  password: '',
  password2: '',
  role: ''
})


interface RegisterRules {
  name: ({
    message: string;
    required: boolean;
    trigger: string;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
  })[];
  email: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
  password: ({
    required: boolean;
    message: string;
    trigger: string;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
  })[];
  password2: ({
    required: boolean;
    message: string;
    trigger: string;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
  } | {
    validator: (rule: RegisterUser, value:string, callback:any ) => void,
    trigger: string;
  })[];
}

const validatePass2 = (rule:RegisterUser, value:string, callback:any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== registerUser.value.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};

export const registerRules = ref<RegisterRules>({
  name: [
    { message: "username can't be empty...", required: true, trigger: 'blur' },
    {
      min: 2,
      max: 30,
      message: "长度为2到30个字符",
      trigger: 'blur'
    }
  ],
  email: [
    { type: "email", message: "Email is incorrect...", required: true, trigger: 'blur' }
  ],
  password: [
    { 
      required: true, 
      message: "Password could not be empty...", 
      trigger: 'blur'
    },
    {
      min: 6,
      max: 30,
      message: "Password's length has to be 6 to 30 characters...",
      trigger: 'blur'
    }
  ],
  password2: [
    { 
      required: true, 
      message: "Password could not be empty...", 
      trigger: 'blur'
    },
    {
      min: 6,
      max: 30,
      message: "Password's length has to be 6 to 30 characters...",
      trigger: 'blur'
    },
    {
      validator: validatePass2,
      trigger: 'blur'
    }
  ],
})




