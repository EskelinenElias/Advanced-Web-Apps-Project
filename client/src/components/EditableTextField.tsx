import { useState } from "react";
import { Typography, TextField, SxProps, Theme } from "@mui/material";
import { TypographyVariant, TextFieldVariants } from "@mui/material";

interface EditableTextFieldProps {
  text: string, 
  textVariant?: TypographyVariant, 
  textFieldVariant?: TextFieldVariants|undefined,
  editCallback: (text: string) => void
  sx?: SxProps<Theme>; 
}

function EditableTextField(props: EditableTextFieldProps) {
  const { text, textVariant, textFieldVariant, editCallback, sx } = props; 
  
  const [isEditing, setIsEditing] = useState(false);
  const [textContent, setTextContent] = useState(text);
  
  // Handle double-click to toggle editing mode
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // Handle input change when editing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextContent(e.target.value);
    editCallback(e.target.value);
  };

  // Handle blur (when user clicks outside or hits enter)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    setTextContent(e.target.value);
    editCallback(e.target.value);
  };

  // Handle Enter key to save the text
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <TextField
          variant={textFieldVariant}
          value={textContent}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          sx={{...sx}}
        />
      ) : (
        <Typography variant={textVariant || 'h3'} onDoubleClick={handleDoubleClick} sx={{color:'text.primary', ...sx}}>
          {textContent}
        </Typography>
      )}
    </div>
  );
};

export default EditableTextField; 