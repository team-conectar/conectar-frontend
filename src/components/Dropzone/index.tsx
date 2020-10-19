import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { BodyDropzone } from './styles';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop
  });

  return (
    <BodyDropzone className="view-img" {...getRootProps()}>
      <input name="upload" id="upload" {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Criação projeto" />
      ) : (
        <>
          <label>Fazer Upload de Imagem</label>
          <p>ou</p>
          {isDragActive ? (
            <p>Solte a imagem</p>
          ) : (
            <p>Arraste o arquivo para cá</p>
          )}
          <p>Tamanho mínimo de 805x632px</p>
        </>
      )}
    </BodyDropzone>
  );
};

export default Dropzone;
