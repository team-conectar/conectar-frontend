import React, { useState, FormEvent, } from 'react';
import { BodyMasteryTools } from './styles';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import SelectTool, { ToolType } from '../../components/SelectTools';
import axios, { AxiosError } from "axios";
import api from "../../services/api";
import Logged from "../../components/Logged";
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

function MasteryTools() {
  const history = useHistory();

  const [selectedTools, setSelectedTools] = useState<ToolType[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const res = await api
      .put("/api/v1/pessoas", { "habilidades": selectedTools }, {
        withCredentials: true,
      })
      .then(() => {
        history.push("/profilefeatures");
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });

    console.log(res);

  }


  return (
    <BodyMasteryTools onSubmit={handleSubmit}>
      <Logged />
      <div className="area-central container">

        <h1>Selecione suas habilidades e ferramentas de domínio</h1>
        <SelectTool
          name="habilidades"
        />


      </div>
      <footer >
        <Button
          theme="secondary-yellow"
          onClick={() => { history.push("/profilefeatures") }}
        >Pular</Button>
        <Button
          theme="primary-yellow"
          type="submit"
          disabled={selectedTools.length == 0}
        >Continuar</Button>
      </footer>
    </BodyMasteryTools>
  )
}
export default MasteryTools;