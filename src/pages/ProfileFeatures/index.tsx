import React from "react";
import { BodyProfileFeatures } from "./styles";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import AcademicExperiences from "../../components/AcademicExperiences";
import ProfessionalExperiences from "../../components/ProfessionalExperiences";
import ProjectExperiences from "../../components/ProjectExperiences";


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
