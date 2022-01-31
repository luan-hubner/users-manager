import { styled } from '@mui/system';
import { ButtonUnstyled, buttonUnstyledClasses, ButtonUnstyledProps } from '@mui/material';

type ButtonProps = {
  label: string;
  color: "success" | "error";
  type?: "submit" | "button";
};

export default function CButton(btn__props: ButtonProps) {
  const CustomButtonRoot = styled('button')`
    font-family: var(--archivo-b);
    font-size: 1rem;
    background-color: ${btn__props.color === "success" ? "var(--green)" : "var(--red)"};
    padding: 12px 24px;
    border-radius: 8px;
    color: var(--bg-dark);
    transition: all 500ms ease;
    cursor: pointer;
    border: none;
  
    &:hover {
      background-color: ${btn__props.color === "success" ? "var(--green-hover)" : "var(--red-hover)"} ;
    }
  
    &.${buttonUnstyledClasses.active} {
      background-color: var(--green);
    }
  
    &.${buttonUnstyledClasses.focusVisible} {
      box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  
  function CustomButton(props: ButtonUnstyledProps) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }

  return (
    <CustomButton {...btn__props}>
      {btn__props.label}
    </CustomButton>
  );
}