import { IRegisterIO } from "../../../../Types";
import { useProductsContext } from "../../../../contexts/CardContexts";
import { FormBoxRegisterModal } from "./styles";
import { useInputContext } from "../../../../contexts/UserInputOutput";

function FormBoxModal() {
  const { registerIOModal } = useProductsContext();
  const { registerInput, setRegisterInput } = useInputContext();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputPrototype: string
  ) => {
    const oldKey = event.target.value;
    setRegisterInput((prevValues: any) => ({
      ...prevValues,
      [inputPrototype]: oldKey,
    }));
  };

  return (
    <FormBoxRegisterModal>
      {registerIOModal.map((registerModalIOCallBack: IRegisterIO) => {
        return (
          <div className="input-pre-set">
            <h1>{registerModalIOCallBack.label}*</h1>
            <input
              placeholder={registerModalIOCallBack.placeholder}
              value={
                registerInput[registerModalIOCallBack.inputPrototype] || ""
              }
              onChange={(e) =>
                handleInputChange(e, registerModalIOCallBack.inputPrototype)
              }
              type={registerModalIOCallBack.type}
            />
          </div>
        );
      })}
    </FormBoxRegisterModal>
  );
}

export default FormBoxModal;
