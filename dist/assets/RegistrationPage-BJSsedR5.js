import{u as p,a as x,s as j,j as e,aL as o,aN as N}from"./index-DbR0xGoJ.js";import{u as g,C as m}from"./index.esm-DiiBKwsN.js";import{B as v}from"./button-DukHqzho.js";const k="_form_mqk7h_1",y="_form__content_mqk7h_7",b="_form__header_mqk7h_18",q="_form__row_mqk7h_24",w="_form__block_mqk7h_30",S="_form__input_mqk7h_35",E="_form__buttons_mqk7h_40",z="_form__footer_mqk7h_45",r={form:k,form__content:y,form__header:b,form__row:q,form__block:w,form__input:S,form__buttons:E,form__footer:z},O=()=>{const n=p(),l=x(),[i,_]=j.useMessage(),c=()=>{i.open({type:"success",content:"Вы успешно зарегистрировались"})},d=g({mode:"onTouched",resetOptions:{keepErrors:!0,keepDirtyValues:!0},defaultValues:{firstName:"",lastName:"",dateOfBirthday:"",email:"",password:""}}),{control:t,formState:{isValid:f},reset:u}=d,h=async()=>{try{l(N({user:{firstName:"Даниил",lastName:"Заварин"},userToken:"danyazavarin"})),localStorage.setItem("userInfo",JSON.stringify({user:{firstName:"Даниил",lastName:"Заварин"},userToken:"danyazavarin"})),u(),c(),setTimeout(()=>n("/main",{replace:!0}),1500)}catch(a){console.log("error",a)}};return e.jsxs("form",{className:r.form,children:[_,e.jsxs("main",{className:r.form__content,children:[e.jsx("header",{className:r.form__header,children:"Регистрация"}),e.jsxs("div",{className:r.form__row,children:[e.jsx(m,{control:t,name:"firstName",rules:{required:"Введите имя",minLength:{value:2,message:"Имя должно содержать минимум 2 буквы"},pattern:{value:/^[-a-zA-Z\u0410-\u044F`]+$/,message:"Неверный формат имени"}},render:({field:a,fieldState:{error:s}})=>e.jsxs("div",{className:r.form__block,children:[e.jsx(o,{isError:!!s,className:r.form__input,type:"text",placeholder:"Введите ваше имя",...a}),s&&e.jsx("div",{style:{color:"red"},children:s.message})]})}),e.jsx(m,{control:t,name:"lastName",rules:{required:"Введите фамилию",pattern:{value:/^[-a-zA-Z\u0410-\u044F`]+$/,message:"Неверный формат фамилии"}},render:({field:a,fieldState:{error:s}})=>e.jsxs("div",{className:r.form__block,children:[e.jsx(o,{isError:!!s,className:r.form__input,type:"text",placeholder:"Введите вашу фамилию",...a}),s&&e.jsx("div",{style:{color:"red"},children:s.message})]})})]}),e.jsxs("div",{className:r.form__row,children:[e.jsx(m,{control:t,name:"dateOfBirthday",rules:{required:"Введите дату рождения"},render:({field:a,fieldState:{error:s}})=>e.jsxs("div",{className:r.form__block,children:[e.jsx(o,{isError:!!s,className:r.form__input,type:"text",placeholder:"Введите дату рождения",...a}),s&&e.jsx("div",{style:{color:"red"},children:s.message})]})}),e.jsx(m,{control:t,name:"email",rules:{required:"Введите свой email",pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,message:"Неверный формат email"}},render:({field:a,fieldState:{error:s}})=>e.jsxs("div",{className:r.form__block,children:[e.jsx(o,{isError:!!s,className:r.form__input,type:"email",placeholder:"Введите свой email",...a}),s&&e.jsx("div",{style:{color:"red"},children:s.message})]})})]}),e.jsx("div",{className:r.form__row,children:e.jsx(m,{control:t,name:"password",rules:{required:"Введите пароль",minLength:{value:2,message:"Пароль не может быть меньше 2 символов"}},render:({field:a,fieldState:{error:s}})=>e.jsxs("div",{className:r.form__block,children:[e.jsx(o,{isError:!!s,className:r.form__input,type:"text",placeholder:"Придумайте пароль",...a}),s&&e.jsx("div",{style:{color:"red"},children:s.message})]})})}),e.jsx("div",{className:r.form__buttons,children:e.jsx(v,{disabled:!f,style:{height:"65px",lineHeight:1,minWidth:"25rem",padding:"20px 30px",fontWeight:500},onClick:()=>h(),children:"Зарегистрироваться"})}),e.jsxs("div",{className:r.form__footer,children:[e.jsx("span",{onClick:()=>n("/authorization"),children:"Войти"}),e.jsx("span",{onClick:()=>n("/main"),children:"Продолжить без регистрации"})]})]})]})};export{O as default};
