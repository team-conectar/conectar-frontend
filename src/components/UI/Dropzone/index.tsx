import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDropzone } from 'react-dropzone'
import { useField } from '@unform/core'
import { BodyDropzone, ImgPreview } from './styles'
interface Props {
  name: string
}
interface InputRefProps extends HTMLInputElement {
  acceptedFile: File
}
export default function ReactDropzoneInput({ name }: Props) {
  const inputRef = useRef<InputRefProps>(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [acceptedFile, setAcceptedFile] = useState(defaultValue)
  const [preview, setPreview] = useState(defaultValue)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: onDropAcceptedFiles => {
      if (inputRef.current) {
        inputRef.current.acceptedFile = onDropAcceptedFiles[0]
        setAcceptedFile(onDropAcceptedFiles[0])
      }
    },
  })

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputRefProps) => {
        return ref.acceptedFile
      },
      clearValue: (ref: InputRefProps) => {
        ref.acceptedFile = {} as File
        setAcceptedFile(null)
      },
      setValue: (ref: InputRefProps, value) => {
        ref.acceptedFile = value
        setAcceptedFile(value)
      },
    })
  }, [fieldName, registerField])
  return (
    <BodyDropzone
      className="view-img"
      {...getRootProps()}
      onClick={() => inputRef.current?.click()}
    >
      <main>
        <input {...getInputProps()} accept="image/*" ref={inputRef} />
        {acceptedFile ? (
          <ImgPreview
            src={URL.createObjectURL(acceptedFile)}
            alt="prvia de imagem"
          />
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
      </main>
      {error && <span>{error}</span>}
    </BodyDropzone>
  )
}
