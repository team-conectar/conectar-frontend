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
  label?: string
  defaultValue?: string
}
interface InputRefProps extends HTMLInputElement {
  acceptedFile: File
}
export default function ReactDropzoneInput({
  name,
  label,
  defaultValue,
}: Props) {
  const inputRef = useRef<InputRefProps>(null)
  const { fieldName, registerField, error } = useField(name)

  const [acceptedFile, setAcceptedFile] = useState<any>()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: onDropAcceptedFiles => {
      if (inputRef.current) {
        inputRef.current.acceptedFile = onDropAcceptedFiles[0]
        setAcceptedFile(onDropAcceptedFiles[0])
      }
    },
  })
  const getPreview = useCallback(async () => {
    if (defaultValue) {
      const response = await fetch(defaultValue)
      const data = await response.blob()
      const metadata = {
        type: 'image/png',
      }
      const file = new File([data], 'test.png', metadata)
      console.log(file)

      setAcceptedFile(file)
    }
  }, [defaultValue])
  useEffect(() => {
    getPreview()
  }, [defaultValue, getPreview])

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
            <p>O tamanho recomendado é de 1300x900px</p>
          </>
        )}
      </main>
      {error && <span>{error}</span>}
    </BodyDropzone>
  )
}
