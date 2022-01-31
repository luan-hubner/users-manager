import { useState } from 'react';

import styles from './styles.module.css';

import Header from '../../components/Header';
import CButton from '../../components/Button';
import CreateUserModal from '../../components/CreateUserModal';
import Table from '../../components/Table';
import { InputText } from '../../components/InputText';
import { InputAdornment, OutlinedInputProps } from '@mui/material';
import { Search } from '@mui/icons-material';

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  role: string;
  photo: string;
}

const usersArr = [
  {
    "id": 1,
    "firstName": "Thomas",
    "lastName": "Hudson",
    "birthDate": "1989-12-24",
    "email": "thomas.hudson@gmail.com",
    "document": "52254883070", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "ADMIN",
    "photo": ""
  },
  {
    "id": 2,
    "firstName": "Gallegos",
    "lastName": "Hopkins",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIREhISEhURERIRDxEREhESERIYEhESGBQZGRgVGBgcIS4lHB4sHxkYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHjEhJCs0MTQ0MTE0NDQ0NDQ0NDQ0NDE0NjQ0NDQxNDQxMTE0NDQxNDQ0NDExNDQ0NDQ0MTQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIEBQYDB//EAD4QAAICAQIEAwYDBgUCBwAAAAECABEDBCEFEjFBUWFxBhMiMoGRUqHRQmKxweHwBxQjcrJDkjM0gqLC4vH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAkEQEBAAICAgEEAwEAAAAAAAAAAQIRAxIhMUETIjJhBFGxFP/aAAwDAQACEQMRAD8A50CSno+nKxLhY9ppuNLx5S6086jqN0I6xQpZoVCoRyQQqEcBVCo4QCEIQFUVSUIEahUlCBGoVK2t4hjxD4z8XZRux/SYeq45kewlYx4jdq9ZFykHRvkVPmZVH7xAng2vwjrkT/uE4/JlZzbFmJ/ESYC/D61cjsnTsBxDCf8AqY/+4T2R1b5SGHkQZxPKT28THjdkNqWQ+IsR2NO3qIic9peOutDIvOPxLQb9DNvT6rHkFowbxHceoky7Q9KiqSiMkRIkakzFCCkakpGAVFHCACBElImBGo4oQOqyYQxnsdMqrPbGgUWZm8R1vYTkx3ldR72dwwxuWShrWF0JViZiTZgJ1SajxeTLtlaYjiEclQRxRwCEIQCEIQCEIQJY8ZY0OsxuP8T92xw4yCw2dwflP4V85f4nxA6bCWXZ8hKIfw7bt9JxLG9z1JJ38fGVyqdG7liSSST1JMgJY0+lfIeVFJJ+33nS8P8AZlTRyEnbcDYA+RmVykaY8eWXpyignznoEbwPT8vWdovCMSEgKDv6mWU0OP8ACPtMrzz+m0/jX5rgwh84wjda+tGfRcejQfsr9hPR9FjPVEPqo8ZH1/0f8v7fNGFx6fIyMGU0R37HyM77VcGwP1QD/btOb4pwFsdnH8ad1/aX9RNMebHL9MsuDLHz7X9BrlzLY2cfMvcHxHlLM47T6hsThlsEHv3HgZ1el1K5EDr3G4/Ce4m8u2L1MiY7hLIEjCEAihCBIRGAgYChCEDp+IawAUJhO5Y2YZchY2ZCUxwmMdPPz3ly/QjihLuZIRyMISnCK4QJQihAcIoQHFFHA5v2nzFsqr2RFoeZ3JmQiXL3GjzZ8nlyj8hPDTD4h6zLKrYzddRw/TjGidAzAEn+U0xqDW1+EzEybS1gnNlXo4+JqLmK2PrL+PEJU06d9/zmrpkrx6TGrjFhE9m0/wCk9dMhJ+pl4Ya61EiLWM+nmdqsflOmzIB26ecyNVju/wCBjWje3A+0WgVQMigD4qau99DH7MKXD4xueYMB5Ef0m7xXT8+PIp/CSB5jcSv/AIaY1bU51PUY1ZRt2cg/xE7OHLfhwc+PXLbbw+zzsLO0o67heTFudxPpaYgFmBxhlIInXcZpzbcHCTzCmIHjPOUWE9Dharo1PfhuH3mQLOvPCxyVXaTJscOqE9AZFp2uHhAW9pzvHNJ7tvWOvg2yrhI3CQLUcUcAhFHABHEI4BJCRhCU4oQgOKELgEIXCBx2tPNkyHxdv41PXQ47YeXWeTi2bxLt/GaenQqBVeJnPnW/HN1e0u+01dPjvuJz5d/lS9zuRViWMOk1YBZGbvsTZ+lzG47+XRMtept1enx1XTrNfBprE4TFn1KEEswII3NkfpOv4bxVmFN4G9q3mdx18r45dvhp6Ycn8Zc5r9Zn4dQCbnqNTy35ecbTp7OhPYzM1Kb9DUhruPvj+VBWwHMJhZ/aN2J/02Ug0So5h6npUt1t9K3OT2sa/HX1sfeY/wDh2eXXv4HT5L6dnTaXm4h7xQHBDUeo2PiJkcBy/wCX1juOnK6+gLKf5TXg8ZeWHP5xlj7G6BkIvtOU4zhIBH5y7puO4yvzdpl8Y4tjIIU2TPQtmnC5RxufWKSY2SfGRMyXaXAD/rCfSdOnMonyrRZ+TIrec+icJ4krKDfaWxL6aLYeXrOI9sWHMtTsNXrBRN9p8+9odX7zJt2lsvSnyyIQhMl1mOKEkOEUcAkohCAxCEISkIQEIBIwhALnjjzczsgoMoDcp/aU+HnLGNAxo7Dck+QlLiGIIVzr8LFwCvlW1/aYcvJZZjG/Dxyy5Vh8n+owoj4yaPUb3NJFoV3lfK4fKWHcD+E903ZRM7dzbXHHTzLqhsn6XvNXScfRKDlFH7xZm+yiVcvDPedCN7O/N8QG5r6SX+RxEDG+N15Sd0DWfrW8p9t9rfdPTVya1ctlAmRQLYYyy5FG2/I4BI37TzxOP2G8x6TR0mmxf5dcCIyKjs65CP8AUVz1YN16UPQShr1UMirTZAKZwAOc+JA2uUyk+F8e3y2+COcitZ6GpPU5auz02i4Hj92D+9PfNp1c0932rvKNGW2oS/jJP7qqSa+kvYcun5bK8m1FmxsFHkWIqpj8S4fzh0L8jN8hDEIN/wBo1Z2//JS0Ps/mQO5zgEKBj91k6te5YEAHbyNzWSaY5W79NPiWBCQy1YoqRVVOe5azZP8AYv8Af5TX4Zhyrz85QgXYF1zdyB2vwlrhPCkyvkyZDSJy2PHuJOGXW7quePaanhjBjC5ocW0/KwcLyK7MANq2O3TxFGZ07Mcu2Mrjyx65WCBhAyypGWNNrcmP5TtK5hA0M3FsjiiZnOSdzJSJi3ZpGEIQLMJG44ScIo4DEcjHcCUIoQJyMYMRgEUIQLGiUF6PcV/7hI+03DwMfMDsrrt4neeWN6YXsCaJ8Ae/3qe+txvnxlA3KwNi/lyFb+04+aaz27OHzhpyrDkavofWXdObImfqGPMeb5g3xeveW9G3SL6Mb5dPoCKAqaaacHsNvLtMTQZpr/5tQtmhQ+8577dM9J6n4VNnlA63MsUG5qJs7EylxviLUjb1zrtWwAs/yEnp/aHTlQGanFdQRflLTC62rcpLquj0TEDpcsZnsb7b/aePB+JYXX4lv61Lep1OnB3IQeLMOvlK6W7R5vpw6/EoYfiWU14Ul2vMfLmofYT1bJy3kxG1B3AOzr3MuafVI/xAUa6bVLxWyMzWY/dpXltPPgmX43T9mwxB7mqEt8Uex6SPs4iMrE7t7xgdugoSu068xS4ynLjdTuPeoU8QSpsfaYM2/abIPeBR0sv/AAUf8T95iTt4ZrFwc93nRAwimzEQEDAQHImSkTAjCEJA945CSkhwiiuBIRyIkoDuORhCUoXFcLgOKEUAYXPfT6oIvI5oj5GPQ/XxnhcUpnhMp5Xw5LjfDm9Z87kbjnPxD5SdzVz30fxD6TQ4tjvGenwkH9Zl8PyUwrsevh/SZZY9ZppjlvLbV0zupreXUJKnIxHKu252vxmdlzlQCeu4rvV9ftUhlZ8i8i2FRfiAvr4nx8KmMx22ueo9c3EVcFQocedEdfCVsmnRgPhUXvagWNvIbzy4Zp8zkriQmmALEAUSwFm+m86PT8F4gpoYw3LlXGSMg2Jqm/27jeW669Ky9vyrD0wGNeYZmoMPgC2QL6k36zZbJjDhnRHofM+7rt1B6fb+s28XANc2Q4m02F25A/Ofd8hWyB8RG52PbtKWp02r5QMmidVKubXGlcuPdmtTYAuKmePVaWDWY3A5DuBdeIlJ3OHJQ/8ADccyfpOcOrXnT3ZKkMQy2bTfv5WaozosGdc2JC1Wr8hJIG56H0meWLTHPd1T1Oo5yf5+E0uBov8AlWYGicmTnYNvyhuldthMXVMoxkj9lCbPlt+f8jKmm4nk9x7pRyKxcsd+ZrYkjyjDC5eIjPkmPmjX6gZMjuNlJpR4INgPtK8DFO+TU04Ld3YgYRSUCAijgORMkZAyAQhCB6CO4hCSk7hcUIQnAGRkoSdwuKECUJER3AcULhAISJjgQz4wysDvakflOWxPytXSjR8jOsnN8Zw8j2Oji/Q95TKbWxuhnz2F7igB4/30mz7OkPkPMQfgoD8Xr4+nkJzAa9vDpNnhGrKMKpbFXXbvMrjqL45by8t9dSMeRwKQFtiNu4NfcCdLw3i+XmDcwYc4ZrWyQBVAiq8d7nMPpS4BG3ga/u4I+XHRWweat+nkf4zOZOv7deZt9Lwe0y8xZk35EWlFNsSTZPUfEa/rKes9pcrAhEVRy0GYHcE9auh6WZwuLjuW6+EENTbHYeM2NHly5qLL8P4jdV5DvLXKxWY8fxNqOp4UgGTMoUO7NkZ66kkk39bMwtPrXQMpK/6hHxc1gAbXXh8XXynVe0OoGPC6LYZhyggdF2tpwORwHJG4VaFk7bDcSuP3Sqcl62abXFc4VfdqSQxBN9yd/oOn3kcS8qgeUz9HzZW53sgG9+pPnNK5vx49Y5+TLtQYrhcU1ZncULiJgOAigJAlImORJgFxyFwhL2EdyIjkhwiuEBwhcIDhcLigThIyUAiuOEAkYQgSmTxtQeTxo/ymozACzsJjcUB963+xa/O5TL8VsJusVlo7z30+Sj5fSTyJfrKvSUnks1XZabjVAWAb7En4dq/l+c6DQ6rHkFEKRVtamvPr9J83wZwN+9f0/nNLQ8SdNlO1mxfjXj/dzLLjb4c1niuy0GnxplyZGClAxUKVJAJ67eO2008vFsajwF8ikD4b/u/tOIx8bKDlXcXfXqQQLs+IlbNxHnTkZhs5a/M7nf1uR0tX+rJ6a3tBxYPjYKOj7cwJNVvV+e85rSad8r8q7i7Y9gPH1g+RsjBRbEih/f5Ts+CcHCBMYBbJkb42oXV7/QATSTrqT3WPnO7vpj4sYQADYCTnvr8HusuTH+B2A9L2/KpXnRZrwwEUIQCK45GQHcchGDAkTIGSMgYSIRQgewjkYXAdx3I3C5IlcdyMIE7gDIwECUIQuA7hcUg+ZF+ZgPUwJwbIFBJNAdzM7LxdAaUFvPoJm6vVtkO+w7L2EjYuY9SdRqFRb92hLEfi5e5+tSzxvCRWSvl2PoZH2XxW+R/AKv8AP9J1A0qZAceQfC21+E0x4+2LTHxHBzxyY5q8V4U+kye7b4kYc2N+zL4eolIpOWy43VX12igRUat6y4ulZz8KsfQGXNLwRjRe1F9O8d5PakwtZiI7fKCT4CW8fDcz9QR237zptNpQgpFAHpN/gnCMmU2o6GuY/Kv17+gkTLLK6xm60+lJ5yrO9m+A+7Hyc+Vj8O3QeX6zvNBwwYFLNTZGFMeyj8I/WXuH6BMCUN2PzPW5P6eU9cwnbwcMxvbLzWOfJudcfEfMfbNPd6pD+zmTY/voaI+xWY06T/E1AMWB+jLqCB47oT/8ROT02pGQWOvceEc01nWePpYkYoXMljihcUgOAigIDJiMDETALhI3CB6iMyAMdwJwkLjuSJCOQLAddpXzcQxp3s+A3kC3HMXLxg/sqB5ncyll1Tv1Y+naRsdFl1eNPmYDy7yjm4wo+RSfM7CYkI2LmbiOR+/KPBZWYk9dzEskBABCEYEDo/ZcfA5/f/kJ1WJOhnNezKVj9XM6nSjcTs4p9saT0s5eGLq8fu3qx8SMR8jdj/fjOPz6BsOR8eReV0NEdj4EeIM+h6RaoyHtJw7FnxozOmPMu2NnIX3g/Ab3I8+33lP5PB2x7Y+/9Thn1ur6cfwtwjAUN9puZOQ18Kk7AALZJ7ADuZRxcF1AZV923M3Qll5a8bBO07TgnBVwgPkp8tfNXwp5KO3rPPw/j55XzNRvly44z+1Phfs/zU+cco6jEOp/3kfwH9J0qY1QBVAUAUABQAjuFz0MOPHCajjyzuV3Qxng4no5nmTNsWb5t/iln/8ALY/E5Mh+gCj/AJGfPMWRkNqaI/OdX/iJqufXuoO2HGmL/wBVF2/5gfScpy/2Jy8t3latGtp9erbN8J/I/WWgQem854T2xZGB2JEziW3CUcWu7OPqJbRwwsGxCUoxFCAzIMY2M82MAuEhzQgewaPmhCB4ajVBBvZPhKOXibn5QF/jCEUU8uRm6kn6zzqEJAVf0hCEgEkFhCSJckfLCEB7CF9YQhDsOBry4k9AfuBN3StuPUD77QhO7D01n4o6n2iVMpwY750cI+QrYVr3VAe4o25+gPWaegyjInzOW5qcgmugyMLJsm6Hh08LhCTus/ld91zlQzUwH+mT1R8haivKNiApAN//AGv8L4qTkODL8/KzYnH/AFEUgEsAKVxa+RBB2NqCEX0iti4XCErEIs08nyBVZj0VSx9ALhCX+FXwHWats+TJmPXLkbIb7czEgfQUJVb0ihOLJYc3rDmqEJRL0v8AOPHkKmwSDCE0QvYdWDs2x8uhlrmhCVqYgzSDNCEhKFwhCQP/2Q=="
  },
  {
    "id": 3,
    "firstName": "Edimilson",
    "lastName": "Caetano",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "ADMIN",
    "photo": "https://cdn.mensagenscomamor.com/content/images/m000227996.jpg?v=0&w=350&h=250"
  },
  {
    "id": 4,
    "firstName": "Felipe",
    "lastName": "da Conceição",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
  {
    "id": 5,
    "firstName": "Robson",
    "lastName": "de Oliveira",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
  {
    "id": 6,
    "firstName": "Gallegos",
    "lastName": "Hopkins",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
  {
    "id": 7,
    "firstName": "Gallegos",
    "lastName": "Hopkins",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
  {
    "id": 8,
    "firstName": "Gallegos",
    "lastName": "Hopkins",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
  {
    "id": 9,
    "firstName": "Gallegos",
    "lastName": "Hopkins",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
  {
    "id": 10,
    "firstName": "Gallegos",
    "lastName": "Hopkins",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
  {
    "id": 11,
    "firstName": "Gallegos",
    "lastName": "Hopkins",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
  {
    "id": 12,
    "firstName": "Gallegos",
    "lastName": "Hopkins",
    "birthDate": "1996-10-24",
    "email": "gallegos@hopkins.com",
    "document": "28453844089", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
    "password": "MTIzNDU2", // base64 de '123456'
    "role": "USER",
    "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
  },
];

export default function Users() {
  const [createUserModalOpened, setCreateUserModalOpened] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>(usersArr);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(usersArr);

  
  function handleSearch(name: string) {
    const filter = users.filter(user =>
      (`${user.firstName} ${user.lastName}`)
        .toLowerCase()
        .includes(name
          .toLowerCase())
    );

    setFilteredUsers(filter);
  };

  return (
    <>
      <main>
        <Header />

        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.content__header}>
              <h1>Olá Luan,&nbsp;</h1>
              <h2>seja bem vindo(a).</h2>
            </div>

            <div className={styles.content__table}>
              <div className={styles.table__header}>
                <h1>usuários</h1>

                <div className={styles.buttons}>
                  <InputText
                    label="pesquisar"
                    variant="filled"
                    InputProps={{ disableUnderline: true, endAdornment: (
                      <InputAdornment position="end">
                        <Search style={{ color: 'var(--input-text-color)'}} />
                      </InputAdornment>
                    )} as Partial<OutlinedInputProps>}
                    onChange={(e) => handleSearch(e.target.value)}
                  />

                  <div onClick={() => setCreateUserModalOpened(true)}>
                    <CButton
                      label="NOVO USUÁRIO"
                      color="success"
                      type="button"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.table__content}>
                <Table users={filteredUsers} />
              </div>
            </div>
          </div>

        </div>
      </main>

      {createUserModalOpened ? <CreateUserModal setCreateUserModalOpened={setCreateUserModalOpened} /> : null}
    </>
  );
}