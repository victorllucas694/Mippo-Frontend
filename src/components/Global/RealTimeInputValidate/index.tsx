import * as React from "react";
import { styled } from "@mui/joy/styles";
import Input from "@mui/joy/Input";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAxios } from "../../../providers/AxiosProvider";

const StyledInput = styled("input")({
  border: "none",
  minWidth: 0,
  outline: 0,
  padding: 0,
  paddingTop: "1em",
  flex: 1,
  color: "inherit",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontStyle: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  textOverflow: "ellipsis",
  "&::placeholder": {
    opacity: 0,
    transition: "0.1s ease-out",
  },
  "&:focus::placeholder": {
    opacity: 1,
  },
  "&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label":
    {
      top: "0.5rem",
      fontSize: "0.75rem",
    },
  "&:focus ~ label": {
    color: "var(--Input-focusedHighlight)",
  },
  "&:-webkit-autofill": {
    alignSelf: "stretch",
  },
  "&:-webkit-autofill:not(* + &)": {
    marginInlineStart: "calc(-1 * var(--Input-paddingInline))",
    paddingInlineStart: "var(--Input-paddingInline)",
    borderTopLeftRadius:
      "calc(var(--Input-radius) - var(--variant-borderWidth, 0px))",
    borderBottomLeftRadius:
      "calc(var(--Input-radius) - var(--variant-borderWidth, 0px))",
  },
});

const StyledLabel = styled("label")(({ theme }) => ({
  position: "absolute",
  lineHeight: 1,
  top: "calc((var(--Input-minHeight) - 1em) / 2)",
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
}));

const InnerInput = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(function InnerInput(props, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledInput {...props} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>Label</StyledLabel>
    </React.Fragment>
  );
});

interface IProductCode {
  productCode: string;
  setProductCode: (code: string) => void;
}

function RealTimeInputValidate({ productCode, setProductCode } : IProductCode) {
  const { axiosInstance } = useAxios();
  const [foundedProductCode, setFoundedProductCode] = useState<boolean>(false);

  return (
    <Input
      endDecorator={<CheckCircleOutlined sx={{ color: foundedProductCode ? 'green' : 'red' }}  />}
      slots={{ input: InnerInput }}
      slotProps={{ input: { placeholder: "Código do produto", type: "text" } }}
      onChange={(e: any) => setProductCode(e.target.value)}
      placeholder="Código do produto"
      type="text"
      value={productCode || ''}
      sx={{
        "--Input-minHeight": "3.5rem",
        "--Input-radius": "6px",
      }}
    />
  );
}

export default RealTimeInputValidate;
