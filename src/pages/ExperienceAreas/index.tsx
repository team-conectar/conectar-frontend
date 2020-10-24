import React, { useState, useEffect, FormEvent } from "react";
import { BodyExperienceAreas } from "./styles";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import SelectArea, { Area } from "../../components/SelectArea";
import Logged from "../../components/Logged";

import axios, { AxiosError } from "axios";

function ExperienceAreas() {
  const history = useHistory();

  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const res = await axios
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

  }

  return (
    <BodyExperienceAreas onSubmit={handleSubmit}>
      <Logged />
      <div className="area-central container">
        <h1>Selecione suas áreas de atuação (máx. 5)</h1>
        <SelectArea
          callbackSelectedAreas={selectedAreas}
          setCallbackSelectedAreas={setSelectedAreas}
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
          disabled={selectedAreas.length == 0}
        >
          Continuar
        </Button>
      </footer>
    </BodyExperienceAreas>
  );
}
export default ExperienceAreas;
