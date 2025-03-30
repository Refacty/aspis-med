"use client"

import React from "react"
import DefaultForm, { Field } from "@/components/DefaultForm"
import { useUserContext } from "@/context/UserContext"

export default function PerfilPage(obj?: any) {

  const user = useUserContext();

  const fields: Field[] = [
    {
      type: "text",
      name: "name",
      label: "Nome",
      placeholder: "Digite seu nome",
      defaultValue: user.user?.name || "",
      required: true,
    },
    {
      type: "text",
      name: "cpf",
      label: "CPF",
      placeholder: "Digite seu CPF",
      defaultValue: user.user?.cpf || "",
      mask: "cpf",
      required: true,
    },
    {
      type: "text",
      name: "whatsapp",
      label: "WhatsApp",
      placeholder: "Digite seu WhatsApp",
      defaultValue: user.user?.whatsapp || "",
      mask: "phone",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "E-mail",
      placeholder: "Digite seu e-mail",
      defaultValue: user.user?.email || "",
      required: true,
    },
    {
      type: "text",
      name: "address",
      label: "Endereço",
      placeholder: "Digite seu endereço",
      defaultValue: user.user?.address || "",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Senha",
      placeholder: "Digite uma nova senha (ou deixe em branco)",
      defaultValue: "",
      overwriteValue: ""
    },
  ];

  return (
    <DefaultForm
      endpoint="users"
      fields={fields}
      onSuccess={() => {}}
      id={user.user?.id}
      route="perfil"
      allowDelete={false}
      tittle="Editar Perfil"
      blockRedirect={true}
    />
  );
}
