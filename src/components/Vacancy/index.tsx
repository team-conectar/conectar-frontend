import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
  useEffect,
  OptionHTMLAttributes,
} from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import Select from "../Select";
import ToggleSwitch from "../ToggleSwitch";
import Button from "../Button";
import { BodyVacancy } from "./styles";
import { inputChange } from "../../utils/inputChange";
import { selectChange } from "../../utils/selectChange";
import { textareaChange } from "../../utils/textareaChange";
import { finalYearOptions, yearOptions } from "../../utils/dates";
import { AxiosError } from "axios";
import api from "../../services/api";
import edit from "../../assets/icon/editar.svg";
import trash from "../../assets/icon/lixeira.svg";
import Modal from "../Modal";


interface VacanciesType {
  nome: string;
  descricao: string;
  visibilidade: true;
  objetivo: string;
  foto_capa: string;
  id: number;
}

const Vacancy: React.FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number>(0);

  useEffect(() => {
    api
      .get("/api/v1/experiencias/academica/me", {
        withCredentials: true,
      })
      .then((response) => {

      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [editingId, showRegister]);

  return (
    <BodyVacancy>


      <h2>Vagas</h2>
      {!showRegister ? (
        <div className="vagas">
          <div key={1} className="vaga-cadastrada">

            <section className="icones">
              <img
                src={edit}
                alt="editar vaga"

              />
              <img
                src={trash}
                alt="apagar vaga"

              />

            </section>
            <fieldset className="info-vagas">


              <legend>Ux Designer</legend>
              <p>
                Trainee | Não remunerado <br />
                  2 Vagas
                </p>

            </fieldset>
          </div>
          <button onClick={() => setShowRegister(true)}>
            <span>+ </span>
            Adicionar
          </button>
        </div>
      ) : (
          <form
            className="form--vaga"
          >
            <aside className="area-registro">

              <Input
                mask=""
                label="Cargo"
                name="cargo"
                required
                className="bloco-cargo"
              //onChange={handleAcademicInputChange}
              //defaultValue={academicFormData?.instituicao}
              />


              <Input
                mask=""
                label="Perfil"
                name="perfil"
                required
                className="bloco-perfil"
              //onChange={handleAcademicInputChange}
              //defaultValue={academicFormData?.instituicao}
              />
              <Input
                mask=""
                label="Quantidade"
                name="quantidade"
                type="number"
                required
                className="bloco-qtd"
              //onChange={handleAcademicInputChange}
              //defaultValue={academicFormData?.instituicao}
              />




              <Textarea
                name="descricao"
                label="Descrição"
                required
                className="bloco-descricao"
              //onChange={handleAcademicTextAreaChange}
              //defaultValue={academicFormData?.descricao}
              />
              <section className="bloco-contatro">


                <ToggleSwitch
                  label="Remunerado"
                  name="remunerado"
                  id="incomplete"
                // onChange={handleAcademicInputChange}
                //defaultChecked={
                //  academicFormData &&
                //  academicFormData?.situacao === "Incompleto"
                //}
                />
              </section>
              <section className="area-botoes">
                <Button
                  type="submit"
                  theme="primary-green"
                //disabled={academicFormData === {} as AcademicType? false:true}
                >
                  Salvar
              </Button>
                <Button
                  theme="secondary-green"

                >
                  Excluir
              </Button>
                <Button
                  onClick={() => {
                    setShowRegister(false);
                    setEditingId(0);
                    //setAcademicFormData(initialAcademicData);
                  }}
                >
                  Cancelar
              </Button>
              </section>
            </aside>
          </form>
        )}
    </BodyVacancy>
  );
};

export default Vacancy;
