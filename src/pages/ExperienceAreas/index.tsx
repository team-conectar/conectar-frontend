import React, { useState, useEffect, useRef, FormEvent, useCallback } from "react";
import { BodyExperienceAreas } from "./styles";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import SelectArea, { AreaType } from "../../components/SelectArea";
import Logged from "../../components/Logged";

import axios, { AxiosError } from "axios";
import api from "../../services/api";
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

function ExperienceAreas() {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [selectedAreas, setSelectedAreas] = useState<AreaType[]>([]);
  const handleSubmit = useCallback(
    async (formData: { area: string[] }) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          area: Yup.array().min(1, 'Seleciono pelo menos 1 área').max(5, "Seleciono no máximo 5"),
          objetivo: Yup.string().required('Objetivo é obrigatório'),
        });
        await schema.validate(formData, {
          abortEarly: false,
        });
        // Validation passed
        const res = await api
          .put("/api/v1/pessoas", { "areas": selectedAreas }, {
            withCredentials: true,
          })
          .then(() => {
            history.push("/masterytools")
          })
          .catch((err: AxiosError) => {
            return err?.response?.data.detail;
          });
        console.log(res);

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    }, [history, selectedAreas]
  );


  return (
    <BodyExperienceAreas onSubmit={handleSubmit} ref={formRef}>
      <Logged />
      <div className="area-central container">
        <h1>Selecione até 5 áreas de atuação de seu conhecimento</h1>
        <SelectArea
          defaultValue={["string", "striasdng", "outro"]}
          name="area"
        />
      </div>
      <footer>
        <Button
          theme="secondary-yellow"
          onClick={() => {
            history.push("/masterytools");
          }}
        >
          Pular
        </Button>
        <Button
          type="submit"
          theme="primary-yellow"
        >
          Continuar
        </Button>
      </footer>
    </BodyExperienceAreas>
  );
}
export default ExperienceAreas;
