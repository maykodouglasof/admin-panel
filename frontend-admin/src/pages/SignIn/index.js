import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Input } from "@rocketseat/unform";
import * as Yup from "yup";

import { signInRequest } from "~/store/modules/auth/actions";

import logo from "~/assets/white-feather.png";

import { FormContainer } from "~/components/Form";
import Spinner from "~/components/Spinner";

import { Content } from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  password: Yup.string().required("A senha é obrigatória")
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img className="signIn-logo" src={logo} alt="Universidade Serafine" />

      <Content>
        <h1>Acessar admin Universidade</h1>

        <FormContainer id="submit" schema={schema} onSubmit={handleSubmit}>
          <div>
            <Input name="email" type="email" placeholder="E-mail" />
            <FaEnvelope size={14} />
          </div>
          <div>
            <Input name="password" type="password" placeholder="Senha" />
            <FaLock size={14} />
          </div>

          <Link to="/forgot_password">Esqueci minha senha</Link>

          <button type="submit">{loading ? <Spinner /> : "Entrar"}</button>
        </FormContainer>
      </Content>
    </>
  );
}
