import { useState } from 'react';

import styles from './styles.module.css';

import Header from '../../components/Header';
import CButton from '../../components/Button';
import CreateUserModal from '../../components/CreateUserModal';
import Table from '../../components/Table';

export default function Users() {
  const [createUserModalOpened, setCreateUserModalOpened] = useState<boolean>(false);

  const users = [
    {
      "id": 1,
      "firstName": "Thomas",
      "lastName": "Hudson",
      "birthDate": "1989-12-24",
      "email": "thomas.hudson@gmail.com",
      "document": "52254883070", // CPF gerado no site: https://www.4devs.com.br/gerador_de_cpf
      "password": "MTIzNDU2", // base64 de '123456'
      "role": "ADMIN",
      "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
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
      "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
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
      "photo": "https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.6435-9/53212816_2098645373559072_5942040116749926400_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yl85ESegI1MAX_NulyQ&tn=MNSel5mrTcaxMezD&_nc_ht=scontent.fcgb1-1.fna&oh=00_AT_p597nrA8aV2c_W2IW3eKx4J4dOg_tkOsMWn72SsYEqA&oe=621D3766"
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

                <div onClick={() => setCreateUserModalOpened(true)}>
                  <CButton
                    label="NOVO USUÁRIO"
                    color="success"
                    type="button"
                  />
                </div>
              </div>

              <div className={styles.table__content}>
                <Table users={users} />
              </div>
            </div>
          </div>

        </div>
      </main>

      {createUserModalOpened ? <CreateUserModal setCreateUserModalOpened={setCreateUserModalOpened} /> : null}
    </>
  );
}