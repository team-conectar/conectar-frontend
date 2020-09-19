import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { BodyProfileFeatures } from "./styles";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select, { OptionsTypes } from "../../components/Select";
import Button from "../../components/Button";
import ToggleSwitch from "../../components/ToggleSwitch";
import { yearOptions, monthOptions } from "../../utils/dates";
import { useHistory } from "react-router-dom";
import edit from "../../assets/icon/editar.svg";
import { inputChange } from "../../utils/inputChange";
import { selectChange } from "../../utils/selectChange";
import { textareaChange } from "../../utils/textareaChange";
import axios, { AxiosError } from "axios";
import AcademicExperiences from "../../components/AcademicExperiences";
import ProfessionalExperiences from "../../components/ProfessionalExperiences";
import ProjectExperiences from "../../components/ProjectExperiences";

interface ShowRegisterTypes {
  first: boolean;
  second: boolean;
  third: boolean;
}
interface DataSchoolExperienceType {
  institution: string;
  trainingLevel: string;
  cource: string;
  localization: string;
  situation: string;
  details: string;
  initialYear: number;
  finalYear: number;
}
interface DataWorkExperienceType {
  organization: string;
  bond: string;
  office: string;
  localization: string;
  details: string;
  initialMonth: string;
  initialYear: number;
  finalMonth: string;
  finalYear: number;
}
interface DataProjectsExperienceType {
  name: string;
  situation: string;
  office: string;
  institution: string;
  current: boolean;
  details: string;
  initialMonth: string;
  initialYear: number;
  finalMonth: string;
  finalYear: number;
}

function ProfileFeatures() {
  const history = useHistory();
 
  return (
    <BodyProfileFeatures>
      <div className="area-central container">
        <h1>Nos conte sua experiência</h1>
        <AcademicExperiences />
        <ProfessionalExperiences />
        <ProjectExperiences />
        <footer>
          <Button theme="secondary-yellow">Pular</Button>{" "}
          <Button
            onClick={() => {
              history.push("/experienceareas");
            }}
            theme="primary-yellow"
          >
            Continuar
          </Button>
        </footer>
      </div>
    </BodyProfileFeatures>
  );
}
export default ProfileFeatures;
