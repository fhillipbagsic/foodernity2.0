import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { forwardRef, useImperativeHandle, useState } from "react";

const Form = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);
  const [alert, setAlert] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState({
    "Canned Goods": false,
    "Instant Noodles": false,
  });
  const [image, setImage] = useState(null);

  useImperativeHandle(ref, () => ({
    openForm() {
      setToggle(true);
    },
  }));

  const handleClose = () => {
    setToggle(false);
  };

  const onPostClick = () => {
    if (!title) return setAlert(true);
    if (!description) return setAlert(true);
    if (Object.values(categories).every((value) => !value))
      return setAlert(true);
    if (!image) return setAlert(true);
    //post here
    setAlert(false);
    console.log(title);
    console.log(description);
    console.log(categories);
    console.log(image);
    handleClose();
  };

  return (
    <>
      {toggle && (
        <Dialog open={toggle}>
          <DialogTitle>Make a Call for Donation</DialogTitle>
          <DialogContent dividers>
            {alert && <Typography>Please fill up</Typography>}
            <TitleInput title={title} setTitle={setTitle} />
            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />
            <Divider />
            <CategoriesInput
              categories={categories}
              setCategories={setCategories}
            />
            <UploadInput setImage={setImage} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={onPostClick}>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
});

export default Form;

function TitleInput({ title, setTitle }) {
  return (
    <TextField
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      label="Title"
      fullWidth
      variant="outlined"
      required
    />
  );
}

function DescriptionInput({ description, setDescription }) {
  return (
    <TextField
      value={description}
      onChange={(e) => {
        setDescription(e.target.value);
      }}
      label="Description"
      margin="normal"
      fullWidth
      multiline
      rows={4}
      variant="outlined"
      required
    />
  );
}

function CategoriesInput({ categories, setCategories }) {
  return (
    <Box mt={1}>
      <Typography variant="h6">Food Categories Needed</Typography>
      {Object.entries(categories).map((category) => (
        <FormControlLabel
          control={<Checkbox checked={category[1]} />}
          label={category[0]}
          onChange={(e) => {
            setCategories({
              ...categories,
              [category[0]]: e.target.checked,
            });
            // console.log(e.target.checked);
          }}
        />
      ))}
    </Box>
  );
}

function UploadInput({ setImage }) {
  return (
    <Box mt={2}>
      <Typography>Upload pubmat</Typography>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
    </Box>
  );
}
