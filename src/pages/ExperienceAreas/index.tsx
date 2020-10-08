import React, { useState, useEffect } from "react";
import { BodyExperienceAreas } from "./styles";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import SelectArea from "../../components/SelectArea";

import axios, { AxiosError } from "axios";

interface AreaTypes {
  area: Area;
  subareas: Area[];
}

interface Area {
  descricao: string;
  id: number;
  area_pai_id?: number;
}

function ExperienceAreas() {
  const history = useHistory();

  const [selectedAreas, setSelectedAreas] = useState<AreaTypes[]>([]);

  useEffect(() => {
    axios
      .get("/api/v1/areas", {
        withCredentials: true,
      })
      .then((result) => {
        setSelectedAreas(result.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, []);

  useEffect(() => {}, [selectedAreas]);
  return (
    <BodyExperienceAreas>
      <div className="area-central container">
        <h1>Selecione suas áreas de atuação (máx. 5)</h1>
        <SelectArea areas={selectedAreas}/>
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
          onClick={() => {
            history.push("/masterytools");
          }}
          theme="primary-yellow"
        >
          Continuar
        </Button>
      </footer>
    </BodyExperienceAreas>
  );
}
export default ExperienceAreas;
