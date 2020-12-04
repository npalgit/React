import React from "react";
import useForm from "../hooks/useForm";
import { StyledInput, Error, Text } from "./TextField";
import {
  CardWrapper,
  CardBody,
  CardFieldset,
  CardOptionsItem,
  CardOptions,
  CardButton,
} from "./Card";
import { initialValues } from "../_util";

export default function AddComponent() {
  const {
    values,
    errors,
    setErrors,
    handleChangeKV,
    handleSubmit,
    valid,
    touched,
    setValues,
    resetValues,
  } = useForm({
    initialValues: initialValues,
    onSubmit(values) {
      if(!values.firstNum || !values.secondNum) return;
      handleChangeKV(
        "result",
        parseInt(values.firstNum, 10) + parseInt(values.secondNum, 10)
      );
      //alert(JSON.stringify({ values, errors }, null, 2));
    },
    validate: null,
  });

  function clearResult() {
    resetValues({ firstNum: "", secondNum: "", result: 0 });
  }

  function handleChange(name, value) {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      handleChangeKV(name, value);
    }
  }

  const _firstNum = !values ? "" : values.firstNum;
  const _secondNum = !values ? "" : values.secondNum;
  const _result = !values ? "" : values.result;
  const _errors = !values ? null : values.errors;

  return (
    <div style={{ background: "lightgray" }}>
      <div style={{ background: "#fff", height: "300px" }}>
        <CardWrapper>
          <CardBody>
            <CardFieldset>
              <CardOptions>
                <CardOptionsItem>
                  <StyledInput
                    id={"firstNum"}
                    name={"firstNum"}
                    type={"text"}
                    placeholder={""}
                    value={_firstNum}
                    onChange={(e) => handleChange("firstNum", e.target.value)}
                    disabled={false}
                    error={""}
                  />
                  {_errors && <Error>{_errors}</Error>}
                </CardOptionsItem>

                <CardOptionsItem>
                  <Text> + </Text>
                </CardOptionsItem>

                <CardOptionsItem>
                  <StyledInput
                    id={"secondNum"}
                    name={"secondNum"}
                    type={"text"}
                    placeholder={""}
                    value={_secondNum}
                    onChange={(e) => handleChange("secondNum", e.target.value)}
                    disabled={false}
                    error={""}
                  />
                  {_errors && <Error>{_errors}</Error>}
                </CardOptionsItem>

                <CardOptionsItem>
                  <Text> = </Text>
                </CardOptionsItem>

                <CardOptionsItem>
                  <StyledInput
                    id={"result"}
                    name={"result"}
                    type={"text"}
                    placeholder={""}
                    value={_result}
                    disabled={true}
                    error={""}
                  />
                </CardOptionsItem>
              </CardOptions>
            </CardFieldset>

            <CardFieldset>
              <CardButton type="button" onClick={clearResult} disabled={!touched}>
                Clear
              </CardButton>
              <CardButton type="button" onClick={handleSubmit}>
                Add
              </CardButton>
            </CardFieldset>
          </CardBody>
        </CardWrapper>
      </div>
    </div>
  );
}
