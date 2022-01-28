import { styled } from '@mui/system';
import { ButtonUnstyled, buttonUnstyledClasses, ButtonUnstyledProps, Stack } from '@mui/material';

type ButtonProps = {
  label: string;
  color: "success" | "error";
};

export default function CButton({ label, color }: ButtonProps) {
  const CustomButtonRoot = styled('button')`
    font-family: var(--archivo-b);
    font-size: 1rem;
    background-color: ${color === "success" ? "var(--green)" : "var(--red)"};
    padding: 12px 24px;
    border-radius: 8px;
    color: var(--bg-dark);
    transition: all 500ms ease;
    cursor: pointer;
    border: none;
  
    &:hover {
      background-color: var(--green-hover);
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
    <CustomButton>
      {label}
    </CustomButton>
  );
}